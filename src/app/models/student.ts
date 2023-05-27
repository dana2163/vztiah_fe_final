import {IUser} from "./user";

export interface IStudent{
  id: number,
  name: string,
  surname: string,
  parent: IUser
}
