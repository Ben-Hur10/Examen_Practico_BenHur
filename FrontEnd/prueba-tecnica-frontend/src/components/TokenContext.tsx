"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TokenContextType {
    token: string | null;
    email: string | null;
    setToken: (token: string | null) => void;
    setEmail: (email: string | null) => void;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    return (
        <TokenContext.Provider value={{ token, email, setToken, setEmail }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = (): TokenContextType => {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};
