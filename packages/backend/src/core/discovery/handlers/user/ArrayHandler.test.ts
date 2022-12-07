import { mock } from '@l2beat/common'
import { Bytes, EthereumAddress } from '@l2beat/types'
import { expect } from 'earljs'

import { DiscoveryProvider } from '../../provider/DiscoveryProvider'
import { ArrayHandler } from './ArrayHandler'

describe(ArrayHandler.name, () => {
  describe('dependencies', () => {
    it('detects no dependencies for a simple definition', () => {
      const handler = new ArrayHandler(
        'someName',
        {
          type: 'array',
          method: 'function foo(uint i) view returns (uint)',
          length: 1,
        },
        [],
      )

      expect(handler.dependencies).toEqual([])
    })

    it('detects dependency from the length field', () => {
      const handler = new ArrayHandler(
        'someName',
        {
          type: 'array',
          method: 'function foo(uint i) view returns (uint)',
          length: '{{ foo }}',
        },
        [],
      )

      expect(handler.dependencies).toEqual(['foo'])
    })
  })

  describe('getMethod', () => {
    it('returns the passed method properly formatted', () => {
      const handler = new ArrayHandler(
        'someName',
        {
          type: 'array',
          method: 'function foo(uint i) view returns (uint)',
        },
        [],
      )

      expect(handler.getMethod()).toEqual(
        'function foo(uint256 i) view returns (uint256)',
      )
    })

    it('rejects a non-array method abi', () => {
      expect(
        () =>
          new ArrayHandler(
            'someName',
            {
              type: 'array',
              method: 'function foo() view returns (uint)',
            },
            [],
          ),
      ).toThrow('Invalid method abi')
    })

    it('finds the method by field name', () => {
      const handler = new ArrayHandler('someName', { type: 'array' }, [
        'function foo(uint256 i) view returns (uint256)',
        'function someName(uint256 i) view returns (uint256)',
        'function someName(uint256 a, uint256 b) view returns (uint256)',
        'function someName() view returns (uint256)',
      ])

      expect(handler.getMethod()).toEqual(
        'function someName(uint256 i) view returns (uint256)',
      )
    })

    it('throws if it cannot find the method by field name', () => {
      expect(
        () =>
          new ArrayHandler('someName', { type: 'array' }, [
            'function foo(uint256 i) view returns (uint256)',
            'function someName(uint256 a, uint256 b) view returns (uint256)',
            'function someName() view returns (uint256)',
          ]),
      ).toThrow('Cannot find an array method for someName')
    })

    it('finds the method by method name', () => {
      const handler = new ArrayHandler(
        'someName',
        { type: 'array', method: 'bar' },
        [
          'function foo(uint256 i) view returns (uint256)',
          'function someName(uint256 i) view returns (uint256)',
          'function someName(uint256 a, uint256 b) view returns (uint256)',
          'function someName() view returns (uint256)',
          'function bar(uint256 i) view returns (uint256)',
          'function bar(uint256 a, uint256 b) view returns (uint256)',
          'function bar() view returns (uint256)',
        ],
      )

      expect(handler.getMethod()).toEqual(
        'function bar(uint256 i) view returns (uint256)',
      )
    })

    it('throws if it cannot find the method by method name', () => {
      expect(
        () =>
          new ArrayHandler('someName', { type: 'array', method: 'bar' }, [
            'function foo(uint256 i) view returns (uint256)',
            'function someName(uint256 i) view returns (uint256)',
            'function someName(uint256 a, uint256 b) view returns (uint256)',
            'function someName() view returns (uint256)',
            'function bar(uint256 a, uint256 b) view returns (uint256)',
            'function bar() view returns (uint256)',
          ]),
      ).toThrow('Cannot find an array method for bar')
    })
  })

  describe('execute', () => {
    const method = 'function owners(uint256 index) view returns (address)'
    const signature = '0x025e7c27'
    const address = EthereumAddress.random()
    const owners = [
      EthereumAddress.random(),
      EthereumAddress.random(),
      EthereumAddress.random(),
    ]

    it('calls the method "length" times', async () => {
      const provider = mock<DiscoveryProvider>({
        async call(passedAddress, data) {
          expect(passedAddress).toEqual(address)

          const index = data.get(35)

          expect(data).toEqual(
            Bytes.fromHex(signature + index.toString().padStart(64, '0')),
          )

          return Bytes.fromHex('00'.repeat(12)).concat(
            Bytes.fromHex(owners[index].toString()),
          )
        },
      })

      const handler = new ArrayHandler(
        'owners',
        { type: 'array', method, length: 3 },
        [],
      )
      const result = await handler.execute(provider, address, {})
      expect<unknown>(result).toEqual({
        field: 'owners',
        value: owners,
      })
    })

    it('resolves the "length" field', async () => {
      const provider = mock<DiscoveryProvider>({
        async call(passedAddress, data) {
          expect(passedAddress).toEqual(address)
          const index = data.get(35)
          return Bytes.fromHex('00'.repeat(12)).concat(
            Bytes.fromHex(owners[index].toString()),
          )
        },
      })

      const handler = new ArrayHandler(
        'owners',
        { type: 'array', method, length: '{{ foo }}' },
        [],
      )
      const result = await handler.execute(provider, address, {
        foo: { field: 'foo', value: 3 },
      })
      expect<unknown>(result).toEqual({
        field: 'owners',
        value: owners,
      })
    })

    it('handles errors when length is present', async () => {
      const provider = mock<DiscoveryProvider>({
        async call(passedAddress, data) {
          expect(passedAddress).toEqual(address)
          const index = data.get(35)
          if (index === 1) {
            throw new Error('revert')
          }
          return Bytes.fromHex('00'.repeat(12)).concat(
            Bytes.fromHex(owners[index].toString()),
          )
        },
      })

      const handler = new ArrayHandler(
        'owners',
        { type: 'array', method, length: 3 },
        [],
      )
      const result = await handler.execute(provider, address, {})
      expect<unknown>(result).toEqual({
        field: 'owners',
        error: 'Execution reverted',
      })
    })

    it('calls the method until revert without length', async () => {
      const provider = mock<DiscoveryProvider>({
        async call(passedAddress, data) {
          expect(passedAddress).toEqual(address)
          const index = data.get(35)
          if (index >= 3) {
            throw new Error('revert')
          }
          return Bytes.fromHex('00'.repeat(12)).concat(
            Bytes.fromHex(owners[index].toString()),
          )
        },
      })

      const handler = new ArrayHandler('owners', { type: 'array', method }, [])
      const result = await handler.execute(provider, address, {})
      expect<unknown>(result).toEqual({
        field: 'owners',
        value: owners,
      })
    })

    it('handles non-revert errors without length', async () => {
      const provider = mock<DiscoveryProvider>({
        async call(passedAddress, data) {
          expect(passedAddress).toEqual(address)
          const index = data.get(35)
          if (index === 1) {
            throw new Error('oops')
          }
          return Bytes.fromHex('00'.repeat(12)).concat(
            Bytes.fromHex(owners[index].toString()),
          )
        },
      })

      const handler = new ArrayHandler('owners', { type: 'array', method }, [])
      const result = await handler.execute(provider, address, {})
      expect<unknown>(result).toEqual({
        field: 'owners',
        error: 'oops',
      })
    })

    it('has a builtin limit of 100', async () => {
      const provider = mock<DiscoveryProvider>({
        async call() {
          return Bytes.fromHex('0'.repeat(64))
        },
      })

      const handler = new ArrayHandler('owners', { type: 'array', method }, [])
      const result = await handler.execute(provider, address, {})
      expect<unknown>(result).toEqual({
        field: 'owners',
        error: 'Too many values. Provide a higher maxLength value',
        value: new Array(100).fill('0x' + '0'.repeat(40)),
      })
    })

    it('can have a different maxLength', async () => {
      const provider = mock<DiscoveryProvider>({
        async call() {
          return Bytes.fromHex('0'.repeat(64))
        },
      })

      const handler = new ArrayHandler(
        'owners',
        { type: 'array', method, maxLength: 15 },
        [],
      )
      const result = await handler.execute(provider, address, {})
      expect<unknown>(result).toEqual({
        field: 'owners',
        error: 'Too many values. Provide a higher maxLength value',
        value: new Array(15).fill('0x' + '0'.repeat(40)),
      })
    })
  })
})
