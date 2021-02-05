export interface INumberValidator {
  isNumber(value: any): Promise<boolean>
}
