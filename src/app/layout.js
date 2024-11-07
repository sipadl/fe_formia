// app/layout.js
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './globals.css'; // Import global styles if you have any
import Link from 'next/link';

export const metadata = {
    title: 'xxx',
    description: 'A simple Next.js application with Bootstrap',
};

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <body className="d-flex flex-column min-vh-100"> {/* Use flexbox to ensure footer stays at the bottom */}
                <header className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <Link href="/" className="navbar-brand mx-4">{metadata.title}</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        {/* <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href="/" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/about" className="nav-link">About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/contact" className="nav-link">Contact</Link>
                                </li>
                            </ul>
                        </div> */}
                    </div>
                </header>

                <div className="container-fluid flex-grow-1 d-flex m-0 p-0"> {/* Use flexbox for layout */}
                    <aside className="col-md-2 bg-dark text-light sidebar d-flex flex-column shadow-sm"> {/* Sidebar takes full height */}
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

                {/* <footer className="footer bg-light text-center mt-auto">
                    <div className="container">
                        <p className="text-muted">&copy; {new Date().getFullYear()} My Website</p>
                    </div>
                </footer> */}
            </body>
        </html>
    );
};

export default Layout;
