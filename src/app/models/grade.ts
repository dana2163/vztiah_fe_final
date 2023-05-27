import {IUser} from "./user";
import {IStudent} from "./student";

export interface IGrade{
  id: number
  name : string
  teacher: IUser
  students? : IStudent[]
}
