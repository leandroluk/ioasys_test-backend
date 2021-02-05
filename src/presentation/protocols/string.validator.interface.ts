export interface IStringValidator {
  isString(value: any): Promise<boolean>
}
