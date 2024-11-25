'use client'
import { logout } from '@/store/slices/authSlices';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

export default function MainAuthLayout({children, metadata}) {
    const router = useRouter();
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)

    const {user} = auth.detail
    return (
        <>
        <header className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link href="/ui/home" className="navbar-brand mx-4">{metadata.title}</Link>
            </div>
        </header>

        <div className="container-fluid flex-grow-1 d-flex m-0 p-0">

            <aside
                className={`col-md-3 bg-dark text-light sidebar d-flex flex-column shadow-sm`}
               >
                <h5 className="p-3">Menu</h5>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link href="/ui/home" className="nav-link btn btn-sm btn-light mx-2 text-start">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/ui/list" className="nav-link btn btn-sm btn-light mx-2 text-start">List</Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/ui/profile" className="nav-link btn btn-sm btn-light mx-2 text-start">Profile</Link>
                    </li>
                    {user.role == 1 ? 
                    <>
                    <hr className='mx-3' />
                    <h5 className='p-3'>Admin</h5>
                    <li className="nav-item">
                    <Link href="/ui/user/list" className="nav-link btn btn-sm btn-light mx-2 text-start">Management User</Link>
                    </li> 
                    <li className="nav-item">
                    <Link href="/ui/gh/list" className="nav-link btn btn-sm btn-light mx-2 text-start">Management GH</Link>
                    </li>
                    </>
                      : ''}
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

            <main className="col-md-9 col-lg-9 px-4 pt-4">
                {children}
            </main>
        </div>
        </>
    )
}
