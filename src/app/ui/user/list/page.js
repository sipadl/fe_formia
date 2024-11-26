'use client'
import { fetchData, getDataFromApi } from '@/app/utils/network';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';

export default function page() {

    const [data, setData] = useState([])
    
    useEffect(() => {
        const getListUser = async () => {
            const dataUser = await fetchData('/api/user/get')
            setData(dataUser.data)
        }

        getListUser();
    }, []);
    

    const customStyles = {
        rows: {
            style: {
                allowoverflow: 'visible', // or 'hidden' based on your requirement
            }
        },
        headCells: {
            style: {
                allowoverflow: 'visible', // or 'hidden'
            }
        },
        cells: {
            style: {
                allowoverflow: 'visible', // or 'hidden'
            }
        }
    };

    const handleEdit = (val) => {
        console.log(val);

    }

    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            sortable: true,
            width: '8%'
        }, {
            name: 'Nama Lengkap',
            selector: row => row.namaLengkap
        },  {
            name: 'Username',
            selector: row => row.username
        }, {
            name: 'Status',
            selector: row => (
                row.status
                    ? 'Active'
                    : 'Inactive'
            )
        }, {
            name: 'Tanggal Buat',
            selector: row => row.createdAt
        }, {
            name: 'Tanggal Ubah',
            selector: row => row.updatedAt
        }, {
            name: 'Action',
            cell: (row) => (
                <Link href={`/ui/home/details/${row.id}`} className="btn btn-light btn-sm">
                    Detail
                </Link>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        }
    ];
  return (
    <div>
      <h5 className=''>Management User</h5>
        <hr />
        <div className='row'>
                    <div className='col-md-6'>
                        <h3 className='mx-1'>List User</h3>
                    </div>
                    <div className='col-md-6  mx-0 d-flex justify-content-end'>
                        <div>
                            <Link
                                href={'/ui/home/add-user'}
                                className='btn btn-sm btn-dark  align-content-end'>+ User</Link>
                        </div>
                    </div>
                    <div className='border'>
                        <DataTable
                            columns={columns}
                            data={data}
                            customStyles={customStyles}
                            pagination="pagination"
                            className='p-2'/>
                    </div>
                </div>
    </div>
  )
}
