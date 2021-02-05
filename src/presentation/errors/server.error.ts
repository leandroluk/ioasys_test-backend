export class ServerError extends Error {
  static REGEX_MATCH = /Server error/
  constructor(more = '') {
    super(['Server error', more].filter(value => !!value).join('. ') + '.')
    Object.setPrototypeOf(this, ServerError.prototype)
  }
}
