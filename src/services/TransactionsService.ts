import { api } from "./api";

export class TransactionsService {
    static async createTransaction(creditedAccountUsername: string, value: number) {
        const response = await api.post('/transactions/send-transaction-message', {
            creditedAccountUsername,
            value
        })

        return response;
    }
}