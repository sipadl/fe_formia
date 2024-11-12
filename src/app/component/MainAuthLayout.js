'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function MainAuthLayout({children, metadata}) {

    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);

    return (
        <>
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href="/" className="navbar-brand mx-4">{metadata.title}</Link>
            </div>
        </header>

        <div className="container-fluid flex-grow-1 d-flex m-0 p-0">
            {
                isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="btn btn-dark position-fixed"
                        style={{
                            top: '10px',
                            left: '10px',
                            zIndex: 1000
                        }}>
                        {
                            isSidebarVisible
                                ? 'Close'
                                : 'Menu'
                        }
                    </button>
                )
            }

            <aside
                className={`col-md-2 bg-dark text-light sidebar d-flex flex-column shadow-sm ${isSidebarVisible || !isMobile
                    ? 'd-flex'
                    : 'd-none'}`}
                style={{
                    transition: 'transform 0.3s ease',
                    transform: isMobile && !isSidebarVisible
                        ? 'translateX(-100%)'
                        : 'translateX(0)',
                    position: isMobile
                        ? 'fixed'
                        : 'static',
                    height: '100vh',
                    zIndex: 999
                }}>
                <h5 className="p-3">Menu</h5>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/ui/home" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/ui/list" className="nav-link">List</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/ui/profile" className="nav-link">Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/ui/settings" className="nav-link">Setting</Link>
                    </li>
                </ul>
            </aside>

            <main className="col-md-10 col-lg-10 px-4 pt-4">
                {children}
            </main>
        </div>
        </>
    )
}
