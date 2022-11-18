import { Transactions } from "./Transactions";

export interface Account {
    id: number;
    balance: number;
    createdAt: Date;
    debitedTransactions: Transactions[]
    creditedTransactions: Transactions[]
}