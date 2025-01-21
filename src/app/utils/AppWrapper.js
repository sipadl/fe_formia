'use client';
import { detail, login, logout } from '@/store/slices/authSlices';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import MainAuthLayout and MainNonAuthLayout components
const MainAuthLayout = dynamic(() => import('../component/MainAuthLayout'), { ssr: false });
const MainNonAuthLayout = dynamic(() => import('../component/MainNonAuthLayout'), { ssr: false });

const AppWrapper = ({ children, meta }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Function to validate JWT token
  const validateToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
      const isExpired = Date.now() >= payload.exp * 1000; // Check if token is expired
      return !isExpired; // Token is valid if not expired
    } catch (err) {
      return false; // Return false if token is invalid
    }
  };

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = sessionStorage.getItem('_token'); // Check token in sessionStorage
    if (token && validateToken(token)) {
      console.log('disini')
      dispatch(login({ token })); // Set state isAuthenticated = true
    } else {
      dispatch(logout()); // Set state isAuthenticated = false
      router.push('/ui/home');
    }

    const cookie = sessionStorage.getItem('_cookie');
    if (cookie) {
      const decodeData = () => {
        const cookieData = sessionStorage.getItem('_cookie');
        if (cookieData) {
          const decodedData = JSON.parse(atob(cookieData));
          dispatch(detail(decodedData)); // Assuming `detail` is an action
        }
      };
      decodeData();
    }
  }, [dispatch, router]);

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
