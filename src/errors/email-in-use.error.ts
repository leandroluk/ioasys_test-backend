export class EmailInUseError extends Error {
  static REGEX_MATCH = /Email .* in use/

  constructor(email: string) {
    super(`Email '${email}' in use.`)
    Object.setPrototypeOf(this, EmailInUseError.prototype)
  }
}
