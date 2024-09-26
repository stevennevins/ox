import { expect, test } from 'vitest'
import * as exports from './index.js'

test('exports', () => {
  expect(Object.keys(exports)).toMatchInlineSnapshot(`
    [
      "Abi",
      "AbiConstructor",
      "AbiError",
      "AbiEvent",
      "AbiFunction",
      "AbiItem",
      "AbiParameters",
      "AccountProof",
      "Address",
      "AesGcm",
      "Authorization",
      "Base58",
      "Base64",
      "Blobs",
      "Block",
      "Bloom",
      "Bytes",
      "Caches",
      "Constants",
      "ContractAddress",
      "Ens",
      "Errors",
      "Filter",
      "Hash",
      "HdKey",
      "Hex",
      "Internal",
      "Fee",
      "Json",
      "Kzg",
      "Log",
      "Mnemonic",
      "PersonalMessage",
      "Provider",
      "PublicKey",
      "Rlp",
      "RpcRequest",
      "RpcResponse",
      "RpcTransport",
      "Secp256k1",
      "P256",
      "Signature",
      "Siwe",
      "Transaction",
      "TransactionLegacy",
      "TransactionEip1559",
      "TransactionEip2930",
      "TransactionEip4844",
      "TransactionEip7702",
      "TransactionEnvelope",
      "TransactionEnvelopeLegacy",
      "TransactionEnvelopeEip1559",
      "TransactionEnvelopeEip2930",
      "TransactionEnvelopeEip4844",
      "TransactionEnvelopeEip7702",
      "TransactionReceipt",
      "TypedData",
      "Types",
      "ValidatorData",
      "Value",
      "WebAuthnP256",
      "WebCryptoP256",
      "Withdrawal",
    ]
  `)
})
