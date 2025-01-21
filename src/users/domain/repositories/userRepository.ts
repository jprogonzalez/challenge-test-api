import { User } from "../entities/user";

export interface UserRepository {
    createUser(userData:User):Promise<User|null>;
    listUsers(params:any):Promise<User[] | any []>;
    getUser(userId:string|number):Promise<User | null>;
    getUserByParamsValue(params:string|number,value:string|any):Promise<User | null>;
    updateUser(userData:User):Promise<User | null>;
    removeUser(userId:string):Promise<any>;
}