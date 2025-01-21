export class RequestBodyCannotBeEmptyException extends Error {
    public readonly http_status: number;

    constructor(message = "Request body cannot be empty") {
        super(message);
        this.name = "RequestBodyCannotBeEmptyException";
        this.http_status = 400;
    }

    toJSON() {
        return {
            name: this.name,
            http_status: this.http_status,
            message: this.message
        };
    }
}