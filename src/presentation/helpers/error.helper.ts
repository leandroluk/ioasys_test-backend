import { IDictionary } from '../../domain/generics/dictionary.interface'

export const errorToJson = (value: string | {[key: string]: any} | Error): IDictionary<any> => {
  const transform = (value: any): any => {
    return value && typeof value === 'object'
      ? Object.getOwnPropertyNames(value)
        .filter(key => value instanceof Error ? key !== 'stack' : true)
        .reduce((obj, key) => ({ ...obj, [key]: transform(value[key]) }), {})
      : value
  }

  return transform(value)
}
