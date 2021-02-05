export class MissingParamError extends Error {
  static REGEX_MATCH = /Missing param.*/
  constructor(param: string, more = '') {
    super([`Missing param '${param}'`, more].filter(value => value).join('. ') + '.')
    Object.setPrototypeOf(this, MissingParamError.prototype)
  }
}
