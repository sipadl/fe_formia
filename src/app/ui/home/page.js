"use client";

import { DataGrid } from '@mui/x-data-grid';
import { Button, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/network';

export default function Page() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await fetchData('/api/ia/list');
                const formattedData = response.data.map((item, index) => ({
                    key: index+1,
                    id: item.id,
                    title: item.title,
                    creator: item.creator,
                    redmineNo: item.redmineNo,
                    status: item.status ? 'Active' : 'Inactive',
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt
                }));
                setRows(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchDataAsync();
    }, []);

    const columns = [
        { field: 'key', headerName: 'No', width: 80 },
        { field: 'title', headerName: 'Impact Analisis', width: 400 },
        { field: 'creator', headerName: 'Pembuat', width: 150 },
        { field: 'redmineNo', headerName: 'No Redmine', width: 150 },
        { field: 'status', headerName: 'Status', width: 100 },
        { field: 'createdAt', headerName: 'Tanggal Buat', width: 150 },
        { field: 'updatedAt', headerName: 'Tanggal Ubah', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            renderCell: (params) => (
                <Link href={`/ui/home/details/${params.row.id}`} passHref>
                    <div className='btn btn-sm btn-primary'>Detail</div>
                    {/* <Button variant="sm" color="primary">Detail</Button> */}

                </Link>
            ),
            sortable: false
        }
    ];

    return (
        <Box sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h5">List Impact Analisis</Typography>
                <Link href="/ui/home/add-new-ia" passHref>
                    <Button variant="contained" color="primary">+ Impact Analisis</Button>
                </Link>
            </Box>
            <DataGrid
                style={{minHeight:"70vh"}}
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                autoHeight
            />
        </Box>
    );
}
