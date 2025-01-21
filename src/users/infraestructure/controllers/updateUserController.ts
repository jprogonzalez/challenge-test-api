import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../application/updateUserUseCase";
import { User } from "../../domain/entities/user";

export class UpdateUserController {

    constructor(readonly useCase:UpdateUserUseCase){}

    async execute(request:Request,response:Response) {
        try {

            const {name,last_name,email,password,role} = request.body;
            const {id} = request.params;

            const user = new User(
                parseInt(id),
                name,
                last_name,
                email,
                password,
                role
            );

            let userUpdated = await this.useCase.execute(user);

            response.status(200).json({
                'data':userUpdated,
                'message':'User updated successfuly'
            });

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Oops, Error to update the user, please try again later",
                    error:error
                });
        }
    }

}