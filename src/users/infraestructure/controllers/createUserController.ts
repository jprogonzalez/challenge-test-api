import { Request, Response } from "express";
import { CreateUserUseCase } from "../../application/createUserUseCase";
import { User } from "../../domain/entities/user";
import { BcryptService } from "../services/bcryptService";

export class CreateUserController {

    constructor(readonly useCase:CreateUserUseCase){}

    async execute(request:Request,response:Response) {
        try {

            const {name,last_name,email,password,role} = request.body;

            const hashedPassword = await BcryptService.hashPassword(password);

            const user = new User(
                null,
                name,
                last_name,
                email,
                hashedPassword,
                role
            );

            let createdUser = await this.useCase.execute(user);

            return response.status(200).json({
                'data':{
                    id:createdUser.id,
                    name:createdUser.name,
                    last_name:createdUser.last_name,
                    email:createdUser.email,
                    role:createdUser.role
                },
                'message':'User created successfuly'
            });

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Oops, Error to create a new user, please try again later",
                    error:error
                });
        }
    }

}