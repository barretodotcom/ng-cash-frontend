import React, { createContext, ReactNode, SetStateAction, useState } from "react";

interface IAuth {
    errorMessage: string | null;
    setErrorMessage: React.Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<IAuth>({} as IAuth);

interface IAuthProvider {
    children: ReactNode
}



export function AuthProvider({ children }: IAuthProvider) {

    const [errorMessage, setErrorMessage] = useState<string | null>('');

    return (
        <AuthContext.Provider value={{
            errorMessage,
            setErrorMessage
        }}>
            {children}
        </AuthContext.Provider>

    )

}