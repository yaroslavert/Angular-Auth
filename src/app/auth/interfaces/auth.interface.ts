export interface LoginData {
    email: string;
    password: string;
}
export interface RegistationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface User {
    id: Number;
    email: string;
    firstName: string;
    lastName: string;
    updatedAt: string;
    createdAt: string;
}
export interface ResponceAuth {
    token: string;
    user: User;
}
