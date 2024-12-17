'use client'
import { fetchData, getDataFromApi } from '@/app/utils/network';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dateConverter } from '@/app/utils/ConverterDate';
import { Button } from 'primereact/button';


export default function page() {

    const [data, setData] = useState([])
    
    useEffect(() => {
        const getListUser = async () => {
            const dataUser = await fetchData('/api/main/gh/list')
            setData(dataUser.data)
        }

        getListUser();
    }, []);
    
  return (
    <div>
        <div className='row'>
                    <div className='col-md-6'>
                        <h3 className='mx-1'>List group Head</h3>
                    </div>
                    <div className='col-md-6  mx-0 d-flex justify-content-end mb-4'>
                        <div>
                            <Link
                                href={'/ui/gh/add-gh'}
                                >
                                    <Button severity='primary' label='
                                    + Group Head
                                    '></Button>
                                    </Link>
                        </div>
                    </div>
                    <div className='border'>
                    <DataTable
                        value={data}
                        paginator
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        rows={5}
                        // tableStyle={{ minHeight: '50vh' }}
                    >
                        {/* Kolom No dengan index */}
                        <Column 
                            header="No" 
                            body={(rowData, options) => options.rowIndex + 1} 
                            // style={{ width: '10%' }}
                        ></Column>
                        <Column 
                            field="name" 
                            sortable 
                            header="Nama" 
                            // style={{ width: '30%' }}
                            body={(val) => (
                                val.user ? val.user.namaLengkap : ''
                            )}
                        ></Column>
                        <Column 
                            field="departement" 
                            sortable 
                            header="Departement" 
                            body={(val) => (
                                val.departement ? val.departement.departementName : ''
                            )}
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            header="Status" 
                            body={(rowData) => (
                                <span 
                                    className={`badge rounded-pill ${
                                        rowData.status == '1' 
                                            ? 'bg-success' 
                                            : rowData.status === '2' 
                                            ? 'bg-warning text-dark' 
                                            : 'bg-secondary'
                                    }`}
                                >
                                    {rowData.status == 1 ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                            )} 
                            sortable
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            field="createdAt" 
                            sortable 
                            header="Tanggal Buat" 
                            body={(val) => (
                                dateConverter(val.createdAt)
                            )}
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column
                        header="Aksi"
                        body={(rowData) => (
                            <Link href={`/ui/gh/edit/${rowData.id}`} >
                                 <Button severity='primary' label='Ubah'></Button>
                            </Link>
                        )}
                        ></Column>
                    </DataTable>

                    </div>
                </div>
    </div>
  )
}
