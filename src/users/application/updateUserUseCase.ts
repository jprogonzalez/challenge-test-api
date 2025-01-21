import { User } from "../domain/entities/user";
import { EmailAlreadyExistsException } from "../domain/exceptions/EmailAlreadyExistsException";
import { UserNotFoundException } from "../domain/exceptions/UserNotFoundException";
import { UserRepository } from "../domain/repositories/userRepository";
import { Validator } from "../domain/validations/userValidate";

export class UpdateUserUseCase {

    constructor(readonly userRepository:UserRepository) {}

    private async isEmailInUse(newEmail: string, userId: number): Promise<boolean> {
        const userWithEmail = await this.userRepository.getUserByParamsValue('email',newEmail);
        return userWithEmail ? userWithEmail.id !== userId : false;
    }

    async execute(
        userData:User
    ):Promise<User|any|null> {

        if (userData.id === null || userData.id === undefined) {
            throw new Error("User ID is required");
        }

        let userValidate = new Validator<User>(userData);

        await userValidate.invalidIfHasErrors();

        const existUser = await this.userRepository.getUser(userData.id);

        if (!existUser) {
            throw new UserNotFoundException(`User with ID ${userData.id} not found`);
        }

        if (existUser.email !== userData.email) {
            const isEmailUsed = await this.isEmailInUse(userData.email, userData.id);
            if (isEmailUsed) {
                throw new EmailAlreadyExistsException(`The email ${userData.email} is already registered by another user`);
            }
        }

        let updatedUser = await this.userRepository.updateUser(userData);

        return updatedUser;
    }
}