import { assertSize } from '../data/assertSize.js'
import { trimLeft, trimRight } from '../data/trim.js'
import {
  InvalidBytesBooleanError,
  InvalidTypeError,
  type InvalidTypeErrorType,
} from '../errors/data.js'
import type { ErrorType as ErrorType_ } from '../errors/error.js'
import { hexToBigInt, hexToNumber } from '../hex/fromHex.js'
import { bytesToHex } from '../hex/toHex.js'
import type { Bytes, Hex } from '../types/data.js'

type To = 'string' | 'hex' | 'bigint' | 'number' | 'boolean'

export declare namespace fromBytes {
  type Options = {
    /** Size of the bytes. */
    size?: number | undefined
  }

  type ReturnType<to extends To> =
    | (to extends 'string' ? string : never)
    | (to extends 'hex' ? Hex : never)
    | (to extends 'bigint' ? bigint : never)
    | (to extends 'number' ? number : never)
    | (to extends 'boolean' ? boolean : never)

  type ErrorType =
    | bytesToBigInt.ErrorType
    | bytesToBoolean.ErrorType
    | bytesToNumber.ErrorType
    | bytesToString.ErrorType
    | bytesToHex.ErrorType
    | InvalidTypeErrorType
    | ErrorType_
}

/**
 * Decodes {@link Bytes} into a UTF-8 string, {@link Hex}, number, bigint or boolean.
 *
 * - Docs: https://oxlib.sh/api/bytes/to
 *
 * @example
 * import { Bytes } from 'ox'
 * Bytes.to(Bytes.from([1, 164]), 'number')
 * // 420
 *
 * @example
 * import { Bytes } from 'ox'
 * Bytes.to(
 *   Bytes.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]),
 *   'string'
 * )
 * // 'Hello world'
 */
export function fromBytes<
  to extends 'string' | 'hex' | 'bigint' | 'number' | 'boolean',
>(
  bytes: Bytes,
  to: to | To,
  options: fromBytes.Options = {},
): fromBytes.ReturnType<to> {
  if (to === 'number')
    return bytesToNumber(bytes, options) as fromBytes.ReturnType<to>
  if (to === 'bigint')
    return bytesToBigInt(bytes, options) as fromBytes.ReturnType<to>
  if (to === 'boolean')
    return bytesToBoolean(bytes, options) as fromBytes.ReturnType<to>
  if (to === 'string')
    return bytesToString(bytes, options) as fromBytes.ReturnType<to>
  if (to === 'hex')
    return bytesToHex(bytes, options) as fromBytes.ReturnType<to>
  throw new InvalidTypeError(to)
}

export declare namespace bytesToBigInt {
  type Options = {
    /** Whether or not the number of a signed representation. */
    signed?: boolean | undefined
    /** Size of the bytes. */
    size?: number | undefined
  }

  type ErrorType = bytesToHex.ErrorType | hexToBigInt.ErrorType | ErrorType_
}

/**
 * Decodes a byte array into a bigint.
 * 
 - Docs: https://oxlib.sh/api/bytes/toBigInt
 *
 * @example
 * import { Bytes } from 'ox'
 * Bytes.toBigInt(Bytes.from([1, 164]))
 * // 420n
 */
export function bytesToBigInt(
  bytes: Bytes,
  options: bytesToBigInt.Options = {},
): bigint {
  const { size } = options
  if (typeof size !== 'undefined') assertSize(bytes, size)
  const hex = bytesToHex(bytes, options)
  return hexToBigInt(hex, options)
}

export declare namespace bytesToBoolean {
  type Options = {
    /** Size of the bytes. */
    size?: number | undefined
  }

  type ErrorType = assertSize.ErrorType | trimLeft.ErrorType | ErrorType_
}

/**
 * Decodes a byte array into a boolean.
 *
 * - Docs: https://oxlib.sh/api/bytes/toBoolean
 *
 * @example
 * import { Bytes } from 'ox'
 * Bytes.toBoolean(Bytes.from([1]))
 * // true
 */
export function bytesToBoolean(
  bytes_: Bytes,
  options: bytesToBoolean.Options = {},
): boolean {
  const { size } = options
  let bytes = bytes_
  if (typeof size !== 'undefined') {
    assertSize(bytes, size)
    bytes = trimLeft(bytes)
  }
  if (bytes.length > 1 || bytes[0]! > 1)
    throw new InvalidBytesBooleanError(bytes)
  return Boolean(bytes[0])
}

export declare namespace bytesToNumber {
  export type Options = bytesToBigInt.Options

  export type ErrorType =
    | bytesToHex.ErrorType
    | hexToNumber.ErrorType
    | ErrorType_
}

/**
 * Decodes a byte array into a number.
 *
 * - Docs: https://oxlib.sh/api/bytes/toNumber
 *
 * @example
 * import { Bytes } from 'ox'
 * Bytes.toNumber(Bytes.from([1, 164]))
 * // 420
 */
export function bytesToNumber(
  bytes: Bytes,
  options: bytesToNumber.Options = {},
): number {
  const { size } = options
  if (typeof size !== 'undefined') assertSize(bytes, size)
  const hex = bytesToHex(bytes, options)
  return hexToNumber(hex, options)
}

const decoder = /*#__PURE__*/ new TextDecoder()

export declare namespace bytesToString {
  export type Options = {
    /** Size of the bytes. */
    size?: number | undefined
  }

  export type ErrorType =
    | assertSize.ErrorType
    | trimRight.ErrorType
    | ErrorType_
}

/**
 * Decodes a byte array into a UTF-8 string.
 *
 * - Docs: https://oxlib.sh/api/bytes/toString
 *
 * @example
 * import { Bytes } from 'ox'
 * const data = Bytes.toString(Bytes.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]))
 * // 'Hello world'
 */
export function bytesToString(
  bytes_: Bytes,
  options: bytesToString.Options = {},
): string {
  const { size } = options

  let bytes = bytes_
  if (typeof size !== 'undefined') {
    assertSize(bytes, size)
    bytes = trimRight(bytes)
  }
  return decoder.decode(bytes)
}
