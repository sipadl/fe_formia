'use client'
import { logout } from '@/store/slices/authSlices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

export default function MainAuthLayout({children, metadata}) {
    const router = useRouter();
    const dispatch = useDispatch()
    return (
        <>
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href="/ui/home" className="navbar-brand mx-4">{metadata.title}</Link>
            </div>
        </header>

        <div className="container-fluid flex-grow-1 d-flex m-0 p-0">

            <aside
                className={`col-md-2 bg-dark text-light sidebar d-flex flex-column shadow-sm`}
               >
                <h5 className="p-3">Menu</h5>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/ui/home" className="nav-link btn btn-sm btn-light mx-2 text-start">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                        <Link href="/ui/list" className="nav-link btn btn-sm btn-light mx-2 text-start">List</Link>
                    </li> */}
                    <li className="nav-item">
                        <Link href="/ui/profile" className="nav-link btn btn-sm btn-light mx-2 text-start">Profile</Link>
                    </li>
                    <hr className='mx-3' />
                    <li className="nav-item ">
                        <Link href="#" onClick={() => {
                            setTimeout(() => {
                                dispatch(logout())
                                localStorage.clear();
                                router.push('/')
                            }, 1000)
                            }}  className="nav-link btn btn-danger btn-sm mx-3 text-light">Logout</Link>
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
