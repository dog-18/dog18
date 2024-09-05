import { TEST } from '@mod'
import { describe, expect, it } from 'bun:test'

describe('Test', () => {
  it('some test', () => {
    expect(TEST).toEqual('abc')
  })
})
