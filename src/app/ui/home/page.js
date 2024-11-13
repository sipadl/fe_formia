"use client"
import { fetchData } from '@/app/utils/network';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

export default function Page() {
    const [data, setData] = useState([]);
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                setIsClient(true); 
                const resp = await fetchData();       
                setData(resp.data);
            } catch (error) {
                console.warn("Error fetching data:", error.message);
            }
        };
        
        fetchDataAsync();
    }, []);

    const customStyles = {
        rows: {
            style: {
                overflow: 'visible', // or 'hidden' based on your requirement
            }
        },
        headCells: {
            style: {
                overflow: 'visible', // or 'hidden'
            }
        },
        cells: {
            style: {
                overflow: 'visible', // or 'hidden'
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
            name: 'Name',
            selector: row => row.name
        }, {
            name: 'Email',
            selector: row => row.email
        }, {
            name: 'No Redmine',
            selector: row => row.redmine_no
        }, {
            name: 'Status',
            selector: row => (
                row.status
                    ? 'Active'
                    : 'Inactive'
            )
        }, {
            name: 'Tanggal Buat',
            selector: row => row.created_at
        }, {
            name: 'Tanggal Ubah',
            selector: row => row.updated_at
        }, {
            name: 'Action',
            cell: (row) => (
                <Link href={`/ui/detail/${row.id}`} className="btn btn-light btn-sm">
                    Detail
                </Link>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            // button: true,
        }
    ];

    if (!isClient) 
        return null; // Avoid rendering on server
    
    return (
        <div>
            <div>
                <div className='row'>
                    <div className='col-md-6'>
                        <h3 className='mx-1'>List Impact Analisis</h3>
                    </div>
                    <div className='col-md-6  mx-0 d-flex justify-content-end'>
                        <div>
                            <Link
                                href={'/ui/home/add-new-ia'}
                                className='btn btn-sm btn-dark  align-content-end'>+ Impact Analisis</Link>
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
        </div>
    );
}
