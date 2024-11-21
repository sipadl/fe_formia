// src/app/ui/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);


    console.log(session);
    useEffect(() => {
        const token = localStorage.getItem('_token');
        if (token) {
            setSession(token);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('_token', token);
        setSession(token);
    };

    const logout = () => {
        localStorage.removeItem('_token');
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ session, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        // console.log(context);
        // throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
