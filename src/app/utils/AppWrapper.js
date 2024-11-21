'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainAuthLayout, MainNonAuthLayout } from '../component';
import { useRouter } from 'next/navigation';
import { login, logout } from '@/store/slices/authSlices';

const AppWrapper = ({ children , meta}) => {
    const dispatch = useDispatch();
    
    const validateToken = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
            const isExpired = Date.now() >= payload.exp * 1000; // Cek apakah token sudah expired
            return !isExpired; // Token valid jika belum expired
        } catch (err) {
            return false; // Jika token tidak valid
        }
    };
    

    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log(isAuthenticated);

    useEffect(() => {
        const token = localStorage.getItem('_token'); // Cek token di localStorage
        if (token && validateToken(token)) {
            dispatch(login({ token })); // Set state isAuthenticated = true
        } else {
            dispatch(logout()); // Set state isAuthenticated = false
        }
    }, [dispatch]);

    return (
        <>
            {isAuthenticated ? (
                <MainAuthLayout metadata={meta}>{children}</MainAuthLayout>
            ) : (
                <MainNonAuthLayout>{children}</MainNonAuthLayout>
            )}
        </>
    );
};

export default AppWrapper;
