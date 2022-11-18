import jwtDecode from "jwt-decode";

export function tokenValidate(token: string) {

    // Valida se o token está dentro do prazo de validade
    if (token) {

        const decoded = jwtDecode<{ exp: number, iat: number }>(token);

        if (new Date(decoded.exp * 1000) > new Date())
            return true;

        return false;
    }

    return false;
}