import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import {getServerSession} from 'next-auth';
import {MainAuthLayout, MainNonAuthLayout} from './component';
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';

const Layout = async ({children}) => {
    const metadata = {
        title: 'xxx',
        description: 'A simple Next.js application with Bootstrap'
    };
    const session = await getServerSession();

    return (
        <html lang="en">
            <body className="d-flex flex-column min-vh-100">
                <title>{metadata.title}</title>
                <meta name='description' content={metadata.description} />
                {
                    session
                        ? <MainAuthLayout children={children} />
                        : <MainNonAuthLayout metadata={metadata} />
                }
            </body>
        </html>
    )
};

export default Layout;
