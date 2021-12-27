import {
  EthereumAddress,
  EtherscanClient,
  HttpClient,
  mock,
} from '../../../src'
import { Response } from 'node-fetch'
import { expect } from 'chai'

describe('EtherscanClient', () => {
  describe('call', () => {
    it('constructs a correct url', async () => {
      const httpClient = mock<HttpClient>({
        async fetch(url) {
          expect(url).to.equal(
            'https://example.com/api?module=mod&action=act&foo=bar&baz=123&apikey=KEY123'
          )
          return new Response(JSON.stringify({ status: '1', message: 'OK' }))
        },
      })

      const etherscanClient = new EtherscanClient(
        httpClient,
        'https://example.com/api',
        'KEY123'
      )
      await etherscanClient.call('mod', 'act', { foo: 'bar', baz: '123' })
    })

    it('throws on non-2XX result', async () => {
      const httpClient = mock<HttpClient>({
        async fetch() {
          return new Response('', { status: 404 })
        },
      })

      const etherscanClient = new EtherscanClient(httpClient, 'url', 'key')
      await expect(etherscanClient.call('mod', 'act', {})).to.be.rejectedWith(
        'Server responded with non-2XX result: 404 Not Found'
      )
    })

    it('throws on non-json response', async () => {
      const httpClient = mock<HttpClient>({
        async fetch() {
          return new Response('text')
        },
      })

      const etherscanClient = new EtherscanClient(httpClient, 'url', 'key')
      await expect(etherscanClient.call('mod', 'act', {})).to.be.rejectedWith(
        /json/
      )
    })

    it('throws on malformed json', async () => {
      const httpClient = mock<HttpClient>({
        async fetch() {
          return new Response(JSON.stringify({ foo: 'bar' }))
        },
      })

      const etherscanClient = new EtherscanClient(httpClient, 'url', 'key')
      await expect(etherscanClient.call('mod', 'act', {})).to.be.rejected
    })

    it('returns a success response', async () => {
      const response = { status: '1', message: 'OK', result: [1, 2] }
      const httpClient = mock<HttpClient>({
        async fetch() {
          return new Response(JSON.stringify(response))
        },
      })

      const etherscanClient = new EtherscanClient(httpClient, 'url', 'key')
      const result = await etherscanClient.call('mod', 'act', {})
      expect(result).to.deep.equal(response)
    })

    it('returns an error response', async () => {
      const response = { status: '0', message: 'NOTOK', result: 'Oops' }
      const httpClient = mock<HttpClient>({
        async fetch() {
          return new Response(JSON.stringify(response))
        },
      })

      const etherscanClient = new EtherscanClient(httpClient, 'url', 'key')
      const result = await etherscanClient.call('mod', 'act', {})
      expect(result).to.deep.equal(response)
    })
  })

  describe('getContractSource', () => {
    it('constructs a correct url', async () => {
      const result = {
        SourceCode: '',
        ABI: 'Contract source code not verified',
        ContractName: '',
        CompilerVersion: '',
        OptimizationUsed: '',
        Runs: '',
        ConstructorArguments: '',
        EVMVersion: 'Default',
        Library: '',
        LicenseType: 'Unknown',
        Proxy: '0',
        Implementation: '',
        SwarmSource: '',
      }
      const httpClient = mock<HttpClient>({
        async fetch() {
          return new Response(
            JSON.stringify({ status: '1', message: 'OK', result: [result] })
          )
        },
      })
      const etherscanClient = new EtherscanClient(httpClient, 'url', 'key')
      const source = await etherscanClient.getContractSource(
        EthereumAddress.ZERO
      )
      expect(source).to.deep.equal(result)
    })
  })
})
