import { User } from "../domain/entities/user";
import { MysqlRepository } from "../infraestructure/repositories/mysqlRepository";

export class ListUsersUseCase {

    constructor(readonly repository:MysqlRepository) {}

    async execute(queryParams:any):Promise<User[] | null> {
        const users = this.repository.listUsers(queryParams);
        return users;
    }

}