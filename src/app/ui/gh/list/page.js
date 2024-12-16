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
            const dataUser = await fetchData('/api/main/gh/list')
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
            selector: row => row.name
        },  {
            name: 'Departement',
            selector: row => row.departement
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
                <Link href={`/ui/gh/edit/${row.id}`} className="btn btn-secondary btn-sm">
                    Edit
                </Link>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        }
    ];
  return (
    <div>
      <h5 className=''>Management Group head</h5>
        <hr />
        <div className='row'>
                    <div className='col-md-6'>
                        <h3 className='mx-1'>List group Head</h3>
                    </div>
                    <div className='col-md-6  mx-0 d-flex justify-content-end'>
                        <div>
                            <Link
                                href={'/ui/gh/add-gh'}
                                className='btn btn-sm btn-dark  align-content-end'>+ Group Head</Link>
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
