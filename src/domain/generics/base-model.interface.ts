export interface IBaseModelTimestamp {
  by: string
  at: Date
}

export interface IBaseModel {
  _id: string
  _created: IBaseModelTimestamp
  _updated?: IBaseModelTimestamp
  _deleted?: IBaseModelTimestamp
}
