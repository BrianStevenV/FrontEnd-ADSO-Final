export interface Login {
    email: string;
    password: string;
}

export interface TokenResponse {
    token: string;
}

export interface TokenPayload {
    email: string;
    password: string,
    id: number,
    roles: string;
    sub: string;
    iat: number;
    exp: number;
}

export const LOCAL_STORAGE_TOKEN_AUTH_NAME = 'token';