'use client';
import { logout } from '@/store/slices/authSlices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export default function MainAuthLayout({ children, metadata }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Function to check if the screen is mobile
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Threshold for mobile
        };

        handleResize(); // Check on initial render
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const { user } = auth.detail;
    return (
        <>
            <header className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link href="/ui/home" className="navbar-brand mx-4">
                        {metadata.title}
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </header>

            <div className="container-fluid m-0 p-0">
                <div className="row g-0">
                    {/* Sidebar */}
                    <nav
                        id="sidebarMenu"
                        className="col-md-2 col-lg-2 d-md-block bg-dark text-light sidebar collapse show"
                        style={{
                            minHeight: isMobile ? 'auto' : '100vh',
                        }}
                    >
                        <div className="position-sticky pt-3">
                            <h5 className="px-3">Menu</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link
                                        href="/ui/home"
                                        className="nav-link btn btn-sm btn-light mx-2 text-start"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        href="/ui/list"
                                        className="nav-link btn btn-sm btn-light mx-2 text-start"
                                    >
                                        List
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        href="/ui/profile"
                                        className="nav-link btn btn-sm btn-light mx-2 text-start"
                                    >
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        href="/ui/signature"
                                        className="nav-link btn btn-sm btn-light mx-2 text-start"
                                    >
                                        Signature
                                    </Link>
                                </li>
                                {user.role.name === 'ADMIN' && (
                                    <>
                                        <hr className="mx-3" />
                                        <h5 className="px-3">Admin</h5>
                                        <li className="nav-item">
                                            <Link
                                                href="/ui/user/list"
                                                className="nav-link btn btn-sm btn-light mx-2 text-start"
                                            >
                                                Management User
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                href="/ui/gh/list"
                                                className="nav-link btn btn-sm btn-light mx-2 text-start"
                                            >
                                                Management GH
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                href="/ui/dh/list"
                                                className="nav-link btn btn-sm btn-light mx-2 text-start"
                                            >
                                                Management Departement
                                            </Link>
                                        </li>
                                    </>
                                )}
                                <hr className="mx-3" />
                                <li className="nav-item text-center d-flex justify-content-center">
                                    <button
                                        onClick={() => {
                                            setTimeout(() => {
                                                dispatch(logout());
                                                sessionStorage.clear();
                                                localStorage.clear()
                                                router.push('/ui');
                                            }, 1000);
                                        }}
                                        className="nav-link btn btn-danger btn-sm mx-3 text-light"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="col-md-10 col-lg-10 px-4 pt-4">{children}</main>
                </div>
            </div>
        </>
    );
}
