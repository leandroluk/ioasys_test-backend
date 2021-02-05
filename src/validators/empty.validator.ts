import { IEmptyValidator } from '../presentation/protocols/empty.validator.interface'

export class EmptyValidator implements IEmptyValidator {
  async isEmpty(val: any): Promise<boolean> {
    return await Promise.resolve(
      [undefined, null, ''].includes(val) ||
      (val instanceof Array && val.length === 0) ||
      (typeof val === 'object' && Object.keys(val).length === 0)
    )
  }
}
