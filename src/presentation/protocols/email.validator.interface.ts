export interface IEmailValidator {
  isEmail(value: string): Promise<boolean>
}
