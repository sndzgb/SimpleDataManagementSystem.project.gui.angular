export class Jwt {
    aud: string | undefined;
    exp: number | undefined;
    iat: number | undefined;
    iss: string | undefined;
    nbf: number | undefined;

    IsPasswordChangeRequired: boolean | undefined;
    UserId: number | undefined;
    Username: string | undefined;
}
