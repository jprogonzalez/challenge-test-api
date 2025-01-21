import { Request, Response } from "express";
import { ListUsersUseCase } from "../../application/listUserUseCase";

export class ListUserController {

    constructor(readonly useCase:ListUsersUseCase){}

    async execute(request:Request,response:Response) {
        try {

            const {pattern} = request.query;

            let users = await this.useCase.execute(pattern ?? "");

            response.status(200).json({
                'data':users?.map((user) => {
                    return {
                        id:user.id,
                        name:user.name,
                        last_name:user.last_name,
                        email:user.email,
                        role:user.role
                    }
                })
            });

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Oops, Error to list users, please try again later",
                    error:error
                });
        }
    }

}