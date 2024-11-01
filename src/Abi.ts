import * as abitype from 'abitype'
import type * as Errors from './Errors.js'
import type { AbiItem_Signatures } from './internal/AbiItem/types.js'

/** Root type for an ABI. */
export type Abi = abitype.Abi

/**
 * Formats an {@link ox#Abi.Abi} into a **Human Readable ABI**.
 *
 * @example
 * ```ts twoslash
 * import { Abi } from 'ox'
 *
 * const formatted = Abi.format([{
 *   type: 'function',
 *   name: 'approve',
 *   stateMutability: 'nonpayable',
 *   inputs: [
 *     {
 *       name: 'spender',
 *       type: 'address',
 *     },
 *     {
 *       name: 'amount',
 *       type: 'uint256',
 *     },
 *   ],
 *   outputs: [{ type: 'bool' }],
 * }])
 *
 * formatted
 * //    ^?
 *
 *
 * ```
 *
 * @param abi - The ABI to format.
 * @returns The formatted ABI.
 */
export function format<const abi extends Abi | readonly unknown[]>(
  abi: abi | Abi | readonly unknown[],
): abitype.FormatAbi<abi> {
  return abitype.formatAbi(abi) as never
}

export declare namespace format {
  type ErrorType = Errors.GlobalErrorType
}

format.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as format.ErrorType

/**
 * Parses an arbitrary **JSON ABI** or **Human Readable ABI** into a typed {@link ox#Abi.Abi}.
 *
 * @example
 * ### JSON ABIs
 *
 * ```ts twoslash
 * import { Abi } from 'ox'
 *
 * const abi = Abi.from([{
 *   type: 'function',
 *   name: 'approve',
 *   stateMutability: 'nonpayable',
 *   inputs: [
 *     {
 *       name: 'spender',
 *       type: 'address',
 *     },
 *     {
 *       name: 'amount',
 *       type: 'uint256',
 *     },
 *   ],
 *   outputs: [{ type: 'bool' }],
 * }])
 *
 * abi
 * //^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @example
 * ### Human Readable ABIs
 *
 * ```ts twoslash
 * import { Abi } from 'ox'
 *
 * const abi = Abi.from([
 *   'function approve(address spender, uint256 amount) returns (bool)'
 * ])
 *
 * abi
 * //^?
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * ```
 *
 * @param abi - The ABI to parse.
 * @returns The typed ABI.
 */
export function from<
  const abi extends Abi | readonly string[] | readonly unknown[],
>(
  abi: (abi | Abi | readonly string[] | readonly unknown[]) &
    (abi extends readonly string[] ? AbiItem_Signatures<abi> : Abi),
): from.ReturnType<abi> {
  if (typeof abi[0] === 'string') return abitype.parseAbi(abi as never)
  return abi as never
}

export declare namespace from {
  type ReturnType<abi extends Abi | readonly string[] | readonly unknown[]> =
    abi extends readonly string[] ? abitype.ParseAbi<abi> : abi

  type ErrorType = Errors.GlobalErrorType
}

from.parseError = (error: unknown) =>
  /* v8 ignore next */
  error as from.ErrorType
