import { IDictionary } from '../domain/generics/dictionary.interface'

export class ObjectValidationError extends Error {
  static REGEX_MATCH = /Object validation error.*/
  constructor(readonly errors: IDictionary<Error>, more = '') {
    super(['Object validation error', more].filter(value => value).join('. ') + '.')
    Object.setPrototypeOf(this, ObjectValidationError.prototype)
  }
}
