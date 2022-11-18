import React, { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../interfaces/Customer";
import { api } from "../services/api";
import { CustomerService } from "../services/CustomerService";
import { TransactionsService } from "../services/TransactionsService";

interface IAuth {
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<SetStateAction<string | null>>;
    sucessMessage: string | null;
    setSucessMessage: React.Dispatch<SetStateAction<string | null>>;
    customer: Customer | null;
    setCustomer: React.Dispatch<SetStateAction<Customer | null>>;
    signInService: (username: string, password: string) => Promise<void>;
    createCustomerService: (username: string, password: string) => Promise<void>;
    createTransaction: (creditedAccountUsername: string, value: number) => Promise<void>;
}

export const AuthContext = createContext<IAuth>({} as IAuth);

interface IAuthProvider {
    children: ReactNode
}

export function AuthProvider({ children }: IAuthProvider) {

    useEffect(() => {
        setLoading(true)
        const stringfiedCustomer = localStorage.getItem('customer')
        const token = localStorage.getItem('token')
        if (stringfiedCustomer) {
            const customer = JSON.parse(stringfiedCustomer);
            setCustomer(customer);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, [])

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>('');
    const [sucessMessage, setSucessMessage] = useState<string | null>('');
    const [customer, setCustomer] = useState<Customer | null>(null);
    const navigation = useNavigate();

    async function signInService(username: string, password: string) {
        try {
            const response = await CustomerService.signIn({ username, password });
            const customer = response.data.customer;
            const token = response.data.token;
            setCustomer(customer);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('customer', JSON.stringify(customer));
            localStorage.setItem('token', token);
            navigation('/you')
        } catch (err: any) {
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
            console.log(err);
        }
    }

    async function createCustomerService(username: string, password: string) {
        try {
            const response = await CustomerService.createCustomer({ username, password });
            setCustomer(response.data.customer);
            api.defaults.headers.common['Authorization'] = response.data.token;
            navigation('/you')
        } catch (err: any) {
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
            console.log(err);
        }
    }

    async function createTransaction(creditedAccountUsername: string, value: number) {

        try {
            const response = await TransactionsService.createTransaction(creditedAccountUsername, value);
            console.log(creditedAccountUsername);
            console.log(response.data);
            setSucessMessage("Transação enviada com sucesso.")
        } catch (err: any) {
            if (err.response) {
                setErrorMessage(err.response.data.message)
            }
            console.log(err);
        }
    }

    if (loading) {

        return <h1>

        </h1>
    }
    return (
        <AuthContext.Provider value={{
            errorMessage,
            setErrorMessage,
            sucessMessage,
            setSucessMessage,
            customer,
            setCustomer,
            signInService,
            createCustomerService,
            createTransaction
        }}>
            {children}
        </AuthContext.Provider>

    )

}