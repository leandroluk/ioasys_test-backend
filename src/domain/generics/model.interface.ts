export interface IModelTimestamp {
  by: string
  at: Date
}

export interface IModel {
  _id: string
  _created: IModelTimestamp
  _updated?: IModelTimestamp
  _deleted?: IModelTimestamp
}
