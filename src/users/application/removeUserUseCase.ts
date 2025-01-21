import { UserNotFoundException } from "../domain/exceptions/UserNotFoundException";
import { MysqlRepository } from "../infraestructure/repositories/mysqlRepository";

export class RemoveUsersUseCase {

    constructor(readonly repository:MysqlRepository) {}

    async execute(removeUserId:string):Promise<any | null> {
        
        if (removeUserId === null || removeUserId === undefined) {
            throw new Error("User ID is required");
        }

        const existUser = await this.repository.getUser(removeUserId);
        
        if (!existUser) {
            throw new UserNotFoundException(`User with ID ${removeUserId} not found`);
        }

        return this.repository.removeUser(removeUserId);
    }

}