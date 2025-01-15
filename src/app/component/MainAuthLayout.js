'use client';
import { logout } from '@/store/slices/authSlices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PanelMenu } from 'primereact/panelmenu';
import { Button } from 'primereact/button';

export default function MainAuthLayout({ children, metadata }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { user } = auth.detail;

    const menuItems = [
        {
            label: 'Home',
            command: () => router.push('/ui/home')
        },
        {
            label: 'List',
            command: () => router.push('/ui/list')
        },
        {
            label: 'Profile',
            command: () => router.push('/ui/profile')
        },
        {
            label: 'Signature',
            command: () => router.push('/ui/signature')
        },
    ];

    const adminMenuItems = [
        {
            label: 'Management User',
            command: () => router.push('/ui/user/list')
        },
        {
            label: 'Management Group',
            command: () => router.push('/ui/group/list')
        },
        {
            label: 'Management Department',
            command: () => router.push('/ui/dh/list')
        },
    ];

    return (
        <>
            {/* Navbar */}
            <header className="navbar navbar-expand-lg navbar-dark p-3 bg-dark">
                <div className="container-fluid">
                    <Link href="/ui/home" className="navbar-brand mx-4">
                        {metadata.title}
                    </Link>
                </div>
            </header>

            {/* Main Layout with PanelMenu on the left */}
            <div className="d-flex" style={{ height: '100vh', display: 'flex'}}>
                {/* Panel Menu (sidebar) */}
                <div
                    style={{
                        width: '20%',
                        minHeight: '100vh',
                        backgroundColor: '#f4f5f7',
                        padding: '18px',  // Add padding around the sidebar for spacing
                    }}
                >
                    <h4 className="text-center">Menu</h4>
                    <PanelMenu
                        model={menuItems}
                        style={{
                            marginBottom: '15px',  // Reduce the bottom margin for tighter spacing
                            padding: '0',  // Remove padding for a compact look
                        }}
                    />
                    {user.role.name === 'ADMIN' && (
                        <>
                            <h4 className="text-center">Admin</h4>
                            <PanelMenu
                                model={adminMenuItems}
                                style={{
                                    marginTop: '10px',  // Reduced margin at the top
                                    padding: '0',  // Remove padding
                                    textDecoration: 'none',
                                }}
                            />
                        </>
                    )}
                    <div className="p-d-flex p-jc-center p-mt-3">
                        <Button
                            label="Logout"
                            className="p-button-danger p-button-sm w-100 mt-2"
                            onClick={() => {
                                setTimeout(() => {
                                    dispatch(logout());
                                    sessionStorage.clear();
                                    localStorage.clear();
                                    router.push('/ui');
                                }, 1000);
                            }}
                        />
                    </div>
                </div>

                {/* Main Content */}
                <main
                    className="container-fluid"
                    style={{
                        width: '80%',
                        flexGrow: 1,
                        paddingTop: '20px',
                        paddingLeft: '20px',
                        paddingRight: '20px',
                    }}
                >
                    {children}
                </main>
            </div>
        </>
    );
}
