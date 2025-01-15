'use client';

import { fetchData, postData } from '@/app/utils/network';
import { detail } from '@/store/slices/authSlices';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import Image from 'next/image';

const SaveSignature = () => {
    const signatureRef = useRef(null);
    const [isEdit, setIsEdit] = useState(false);
    const [signatureUrl, setSignatureUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const toastRef = useRef(null);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        const getsignature = async () => {
            const {data} = await fetchData('/api/main/signature/my')
            if(data){
                setSignatureUrl(data?.signature);
            }
        }
        const decodeData = () => {
            const cookieData = localStorage.getItem('_cookie');
            if (cookieData) {
                const decodedData = JSON.parse(atob(cookieData));
                dispatch(detail(decodedData)); // Assuming `detail` is an action
            }
        };
        getsignature();
        decodeData();
    }, [dispatch]);

    const { user } = auth.detail || {};

    // Membersihkan tanda tangan
    const clearSignature = () => {
        signatureRef.current.clear();
        setSignatureUrl(null);
        toastRef.current.show({ severity: 'info', summary: 'Tanda tangan dibersihkan' });
    };

    // Menyimpan tanda tangan
    const saveSignature = async () => {
        if (!signatureRef.current.isEmpty()) {
            setLoading(true);
            const dataUrl = signatureRef.current.toDataURL('image/png');
            try {
                if(isEdit){
                    await postData('/api/main/signature/update', {
                        signature: dataUrl,
                        userId: user.id
                    })
                    window.location.reload()
                } else {
                    await postData('/api/main/save/signature', {
                        signature: dataUrl,
                        userId: user.id
                    });
                    window.location.reload()
                }
                setLoading(false);
                toastRef.current.show({ severity: 'success', summary: 'Tanda tangan berhasil disimpan' });
            } catch (error) {
                setLoading(false);
                toastRef.current.show({ severity: 'error', summary: 'Gagal menyimpan tanda tangan', detail: error.message });
            }
        } else {
            toastRef.current.show({ severity: 'warn', summary: 'Tanda tangan kosong!', detail: 'Harap buat tanda tangan terlebih dahulu.' });
        }
    };


    return (
        <div className="container mt-5">
            <Toast ref={toastRef} />
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h2 className="text-center mb-4">Tanda Tangan Digital</h2>
                    <div className="border rounded bg-light p-3">
                    {signatureUrl ? 
                    <Image src={signatureUrl} alt='...'/>
                    : 
                        <SignatureCanvas
                            ref={signatureRef}
                            penColor="black"
                            canvasProps={{
                                width: 500,
                                height: 200,
                                className: 'signature-canvas'
                            }}
                            />
                    }
                    </div>

                    {/* Tombol Aksi */}
                    <div className="text-center mt-3">
                        {!signatureUrl && 
                        <Button
                        label="Bersihkan"
                        icon="pi pi-eraser"
                        className="p-button-secondary me-2"
                        onClick={clearSignature}
                        />
                        }
                        <Button
                            label={signatureUrl ? "Ubah" : "Simpan" }
                            icon={signatureUrl ? "pi pi-pencil" : "pi pi-save"}
                            className="p-button-primary"
                            onClick={signatureUrl ? () => {
                                setSignatureUrl('')
                                setIsEdit(true)
                            }  : saveSignature}
                            loading={loading}
                        />
                    </div>

                    {/* Dialog Menampilkan Tanda Tangan yang Disimpan */}
                    <Dialog
                        header="Hasil Tanda Tangan"
                        visible={showDialog}
                        style={{ width: '50vw' }}
                        onHide={() => setShowDialog(false)}
                    >
                        {signatureUrl && (
                            <div className="text-center">
                                <Image
                                    src={signatureUrl}
                                    alt="Tanda Tangan"
                                    className="border rounded"
                                    style={{
                                        width: '100%',
                                        maxWidth: '700px'
                                    }}
                                />
                            </div>
                        )}
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default SaveSignature;
