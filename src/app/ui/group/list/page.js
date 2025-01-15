'use client';

import { fetchData } from '@/app/utils/network';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dateConverter } from '@/app/utils/ConverterDate';
import { Button } from 'primereact/button';

export default function Page() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        const getListUser = async () => {
            try {
                const dataUser = await fetchData('/api/main/group/list');
                setData(dataUser.data);
                setLoading(false);  // Set loading to false after fetching the data
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);  // Ensure loading is turned off even if there's an error
            }
        };

        getListUser();
    }, []);

    // Display a loading message until data is fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    <h3 className='mx-1'>List Group</h3>
                </div>
                <div className='col-md-6 mx-0 d-flex justify-content-end mb-4'>
                    <div>
                        <Link href={'/ui/group/add'}>
                            <Button severity='primary' label='+ Group' />
                        </Link>
                    </div>
                </div>
                <div className='border'>
                    <DataTable
                        value={data}
                        paginator
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        rows={5}
                    >
                        {/* Kolom No dengan index */}
                        <Column
                            header="No"
                            body={(rowData, options) => options.rowIndex + 1}
                        ></Column>
                        <Column
                            field="name"
                            sortable
                            header="Nama"
                            body={(val) => val.name}
                        ></Column>

                        <Column
                            header="Status"
                            body={(rowData) => (
                                <span
                                    className={`badge rounded-pill ${
                                        rowData.status === '1'
                                            ? 'bg-success'
                                            : rowData.status === '2'
                                            ? 'bg-warning text-dark'
                                            : 'bg-secondary'
                                    }`}
                                >
                                    {rowData.status === '1' ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                            )}
                            sortable
                        ></Column>
                        <Column
                            field="createdAt"
                            sortable
                            header="Tanggal Buat"
                            body={(val) => dateConverter(val.createdAt)}
                        ></Column>
                        <Column
                            header="Aksi"
                            body={(rowData) => (
                                <Link href={`/ui/group/edit/${rowData.id}`}>
                                    <Button severity='primary' label='Ubah' />
                                </Link>
                            )}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
