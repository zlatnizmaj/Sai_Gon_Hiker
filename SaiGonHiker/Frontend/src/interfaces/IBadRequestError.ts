
export default interface IBadRequestError<T> {
    [errors: string]: Array<string>;
}

export type ChangeTypeOfKeys<T extends object> = {
    [key in keyof T]: T[key] extends Array<string> ? string : T[key]
   
  }