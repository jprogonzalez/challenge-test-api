import { User } from "../domain/entities/user";
import { EmailAlreadyExistsException } from "../domain/exceptions/EmailAlreadyExistsException";
import { UserRepository } from "../domain/repositories/userRepository";
import { Validator } from "../domain/validations/userValidate";

export class CreateUserUseCase {

    constructor(readonly userRepository:UserRepository) {}

    async execute(
       user:User
    ):Promise<User|any|null> {
        
        let userValidate = new Validator<User>(user);

        await userValidate.invalidIfHasErrors();

        const existUserWithThisEmail = await this.userRepository.getUserByParamsValue('email',user.email);

        if (existUserWithThisEmail) {
            throw new EmailAlreadyExistsException(`The email ${user.email} is already registered`);
        }

        let createdUser = await this.userRepository.createUser(user);

        return createdUser;
    }
}