'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { MainAuthLayout, MainNonAuthLayout } from './component';
import './globals.css';

const Layout = ({children}) => {
    const [session, setSession] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('_token');
        setSession(token)        
    },[])


    const metadata = {
        title: 'xxx',
        description: 'A simple Next.js application with Bootstrap'
    };

    return (
        <html lang="en">
            <body className="d-flex flex-column min-vh-100">
                <title>{metadata ? metadata.title : ''}</title>
                <meta name='description' content={metadata ? metadata.description : ''}/> {
                    session
                        ? <MainAuthLayout children={children} metadata={metadata} />
                        : <MainNonAuthLayout metadata={metadata}/>
                }
            </body>
        </html>
    )
};

export default Layout;