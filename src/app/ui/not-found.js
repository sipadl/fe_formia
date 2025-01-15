'use client';

export default function NotFound() {
    useEffect(() => {
        if (typeof document !== 'undefined') {
            console.log(document.title);
        }
    }, []);

    return <div>Halaman tidak ditemukan.</div>;
}
