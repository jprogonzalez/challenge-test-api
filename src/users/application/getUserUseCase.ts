import { User } from "../domain/entities/user";
import { UserNotFoundException } from "../domain/exceptions/UserNotFoundException";
import { MysqlRepository } from "../infraestructure/repositories/mysqlRepository";

export class GetUserUseCase {

    constructor(readonly repository:MysqlRepository) {}

    async execute(userId:string):Promise<any | null> {

        if (userId === null || userId === undefined) {
            throw new Error("User ID is required");
        }

        const user:User = await this.repository.getUser(userId);

        if (!user) {
            throw new UserNotFoundException(`User with ID ${userId} not found`);
        }

        return user;
    }

}