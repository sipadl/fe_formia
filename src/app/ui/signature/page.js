'use client'
import {postData} from '@/app/utils/network';
import {detail} from '@/store/slices/authSlices';
import { useRouter } from 'next/navigation';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';

const SaveSignature = () => {
    const signatureRef = useRef(null);
    const [signatureUrl, setSignatureUrl] = useState(null);
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        const decodeData = () => {
            const cookieData = localStorage.getItem("_cookie");
            if (cookieData) {
                const decodedData = JSON.parse(atob(cookieData));
                dispatch(detail(decodedData)); // Assuming `detail` is an action
            }
        };
        decodeData();
    }, [dispatch]);
    const { user } = auth.detail;
    // Membersihkan tanda tangan
    const clearSignature = () => {
        signatureRef
            .current
            .clear();
        setSignatureUrl(null);
    };

    // Menyimpan tanda tangan
    const saveSignature = () => {
        if (!signatureRef.current.isEmpty()) {
            const dataUrl = signatureRef
                .current
                .toDataURL('image/png');
            setTimeout(async () => {
                const data = await postData('/api/main/save/signature', {
                    signature: dataUrl,
                    userId: user.id
                })
                router.push('/ui/home')
            }, 2000)
            //   setSignatureUrl(dataUrl);
        } else {
            alert('Tanda tangan kosong! Harap buat tanda tangan terlebih dahulu.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="text-center mb-4">Tanda Tangan Digital</h2>

                    {/* Canvas Tanda Tangan */}
                    <div className="border rounded bg-light p-3">
                        <SignatureCanvas
                            ref={signatureRef}
                            penColor="black"
                            canvasProps={{
                                width: 500,
                                height: 200,
                                className: 'signature-canvas'
                            }}/>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="text-center mt-3">
                        <button className="btn btn-secondary me-2" onClick={clearSignature}>
                            Bersihkan
                        </button>
                        <button className="btn btn-primary" onClick={saveSignature}>
                            Simpan
                        </button>
                    </div>

                    {/* Menampilkan Tanda Tangan yang Disimpan */}
                    {
                        signatureUrl && (
                            <div className="mt-4 text-center">
                                <h5>Hasil Tanda Tangan:</h5>
                                <img
                                    src={signatureUrl}
                                    alt="Tanda Tangan"
                                    className="border rounded"
                                    style={{
                                        width: '100%',
                                        maxWidth: '700px'
                                    }}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default SaveSignature;
