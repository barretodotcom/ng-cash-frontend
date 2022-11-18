import { Account } from "./Account";

export interface Customer {
    username: string;
    password?: string;
    account: Account
}