import { Request, Response } from "express";
import { RemoveUsersUseCase } from "../../application/removeUserUseCase";

export class RemoveUserController {

    constructor(readonly useCase:RemoveUsersUseCase){}

    async execute(request:Request,response:Response) {
        try {

            let {id} = request.params;

            await this.useCase.execute(id);

            response.status(200).json({
                'message':'User deleted successfuly'
            });

        }catch(error:any) {
            response.status(error.http_status ?? 500)
                .json({
                    message:"Oops, Error to remove user, please try again later",
                    error:error
                });
        }
    }

}