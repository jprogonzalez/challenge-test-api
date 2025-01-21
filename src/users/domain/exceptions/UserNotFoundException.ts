export class UserNotFoundException extends Error {
    public readonly http_status: number;

    constructor(message = "User not found") {
        super(message);
        this.name = "UserNotFoundException";
        this.http_status = 404;
    }

    toJSON() {
        return {
            name: this.name,
            http_status: this.http_status,
            message: this.message
        };
    }
}