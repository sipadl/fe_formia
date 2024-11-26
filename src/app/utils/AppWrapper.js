'use client';
import { detail, login, logout } from '@/store/slices/authSlices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MainAuthLayout, MainNonAuthLayout } from '../component';
import { useRouter } from 'next/navigation';

const AppWrapper = ({ children , meta}) => {
    const dispatch = useDispatch();
    const router = useRouter();
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

    useEffect(() => {
        
        const token = localStorage.getItem('_token'); // Cek token di localStorage
        if (token && validateToken(token)) {
            dispatch(login({ token })); // Set state isAuthenticated = true
        } else {
            dispatch(logout()); // Set state isAuthenticated = false
            router.push('/ui')
        }

        const cookie = localStorage.getItem('_cookie')
        if(cookie){
            const decodeData = () => {
                const cookieData = localStorage.getItem("_cookie");
                if (cookieData) {
                    const decodedData = JSON.parse(atob(cookieData));
                    dispatch(detail(decodedData)); // Assuming `detail` is an action
                }
            };
            decodeData();
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
