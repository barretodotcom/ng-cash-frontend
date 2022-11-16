import { api } from "./api";

interface ICustomerSession {
    username: string;
    password: string;
}

export class CustomerService {
    static async signIn({ username, password }: ICustomerSession) {
        const response = await api.post('/customers/session', {
            username,
            password
        })

        return response.data;
    }
}