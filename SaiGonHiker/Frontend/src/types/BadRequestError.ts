export type BadRequestError<T extends object> = {
  [key in keyof T]: T[key] extends Array<string> ? string : T[key];
};
