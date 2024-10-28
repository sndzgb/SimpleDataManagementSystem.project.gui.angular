export class WebApiHttpError extends Error {
    constructor(message: string = "", statusCode: number = 0, errors: string[] = []) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
    }

    statusCode: number = 0;
    errors: string[] = [];
}