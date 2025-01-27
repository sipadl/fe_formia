'use client'
import { fetchData, getDataFromApi } from '@/app/utils/network';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dateConverter } from '@/app/utils/ConverterDate';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

export default function Page() {

    const [data, setData] = useState([])
    const router = useRouter();
    
    useEffect(() => {
        const getListUser = async () => {
            const dataUser = await fetchData('/api/user/get')
            setData(dataUser.data)
        }
        getListUser();
    }, []);
  return (
    <div>
        <div className='row'>
                    <div className='col-md-6'>
                        <h3 className='mx-1'>List User</h3>
                    </div>
                    <div className='col-md-6  mx-0 d-flex justify-content-end mb-4'>
                        <div>
                            <Button severity='primary' label='+ User' onClick={ () => 
                                router.push('/ui/user/add-user')
                            }></Button>
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
                            field="namaLengkap" 
                            sortable 
                            header="Nama Lengkap" 
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            field="departement" 
                            sortable 
                            header="Departement"
                            body={(rows) => {
                                return rows.departement.departementName;
                            }} 
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
                            body={(datax) => {
                                return dateConverter(datax.createdAt)
                            }}
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column
                        field="role" 
                        sortable 
                        header="Role" 
                        body={(datax) => {
                            return datax.role.name
                        }}
                        ></Column>
                        <Column
                        header="Aksi"
                        body={(rowData) => (
                            <Link href={`/ui/user/edit/${rowData.id}`} >
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
