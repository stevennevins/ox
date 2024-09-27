import { BaseError } from '../Errors/base.js'

/** Thrown when a WebAuthn P256 credential creation fails. */
export class WebAuthnP256_CredentialCreationFailedError extends BaseError<Error> {
  override readonly name = 'WebAuthnP256.CredentialCreationFailedError'

  constructor({ cause }: { cause?: Error | undefined } = {}) {
    super('Failed to create credential.', {
      cause,
    })
  }
}

/** Thrown when a WebAuthn P256 credential request fails. */
export class WebAuthnP256_CredentialRequestFailedError extends BaseError<Error> {
  override readonly name = 'WebAuthnP256.CredentialRequestFailedError'

  constructor({ cause }: { cause?: Error | undefined } = {}) {
    super('Failed to request credential.', {
      cause,
    })
  }
}
