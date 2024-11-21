'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'; // Redux Provider
import store from '../store'; // Import Redux store
import AppWrapper from './utils/AppWrapper'; // Authenticated/non-authenticated wrapper
import './globals.css';

const Layout = ({ children }) => {
    const metadata = {
        title: 'My Next.js App',
        description: 'A simple Next.js application with Bootstrap'
    };

    return (
        <html lang="en">
            <head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </head>
            <body className="d-flex flex-column min-vh-100">
                <Provider store={store}>
                    <AppWrapper meta={metadata}>{children}</AppWrapper>
                </Provider>
            </body>
        </html>
    );
};

export default Layout;
