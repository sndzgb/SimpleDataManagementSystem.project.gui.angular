export class HttpError {
    message: string | undefined;
    statusCode: number | undefined;
    errors: Array<string> | undefined;
}