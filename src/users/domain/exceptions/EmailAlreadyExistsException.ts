export class EmailAlreadyExistsException extends Error {
    public readonly http_status: number;

    constructor(message = "Email already exists") {
        super(message);
        this.name = "EmailAlreadyExistsException";
        this.http_status = 409;
        Object.setPrototypeOf(this, EmailAlreadyExistsException.prototype);
    }

    toJSON() {
        return {
            name: this.name,
            http_status: this.http_status,
            message: this.message,
        };
    }
}
