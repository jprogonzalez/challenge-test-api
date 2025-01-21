import { IsNotEmpty,ValidateIf } from "class-validator";
import { ValidatableEntity } from "../validations/validatable";

export class User implements ValidatableEntity {

    public id:number|null;

    @IsNotEmpty()
    public name:string;

    @IsNotEmpty()
    public last_name:string;

    @IsNotEmpty()
    public email:string;

    @ValidateIf((o) => o.password)
    @IsNotEmpty()
    public password:string;

    @IsNotEmpty()
    public role:string;

    constructor(
        id:number|null,
        name:string,
        last_name:string, 
        email:string, 
        password:string,
        role:string
    ) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    async validate() {
        return Promise.resolve();
    }


}