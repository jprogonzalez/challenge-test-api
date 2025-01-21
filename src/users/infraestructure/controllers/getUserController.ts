import { Request, Response } from "express";
import { GetUserUseCase } from "../../application/getUserUseCase";
import { UserNotFoundException } from "../../domain/exceptions/UserNotFoundException";

export class GetUserController {

    constructor(readonly useCase:GetUserUseCase){}

    async execute(request:Request,response:Response) {
        try {

            const {id} = request.params;

            let user = await this.useCase.execute(id);

            return response.status(200).json({
                'data':user ?? {},
                
            });

        }catch(error:any) {
            
            response.status(error.http_status ?? 500)
                .json({
                    message:"Oops, Error to get the user, please try again later",
                    error:error
                });
        }
    }

}