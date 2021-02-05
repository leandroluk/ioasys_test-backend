export class InvalidParamError extends Error {
  static REGEX_MATCH = /Invalid param.*/

  constructor(param: string, more = '') {
    super([`Invalid param '${param}'`, more].filter(value => !!value).join('. ') + '.')
    Object.setPrototypeOf(this, InvalidParamError.prototype)
  }
}
