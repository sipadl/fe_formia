'use client';

import { useEffect } from "react";

export default function NotFound() {
    useEffect(() => {
        if (typeof document !== 'undefined') {
            console.log(document.title);
        }

        location.replace('/ui/home');
    }, []);

    return <div>Halaman tidak ditemukan.</div>;
}
