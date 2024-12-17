"use client";

import { Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/network';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dateConverter } from '@/app/utils/ConverterDate';
import { Button } from 'primereact/button';

export default function Page() {
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State untuk indikator loading

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                setIsLoading(true); // Aktifkan indikator loading

                const response = await fetchData('/api/ia/list?size=300&sort=id,createdAt');
            
                // Format data sesuai kebutuhan
                const formattedData = response.data.content.map((item, index) => ({
                    key: index + 1,
                    id: item.id,
                    title: item.title,
                    creator: item.creator,
                    redmineNo: item.redmineNo,
                    status: item.status ? 'Active' : 'Inactive',
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                }));

                setRows(formattedData);
            } catch (error) {

            } finally {
                setIsLoading(false); // Nonaktifkan indikator loading
            }
        };

        fetchDataAsync();
    }, []);

    return (
        <Box sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h5">List Impact Analisis</Typography>
                <Link href="/ui/home/add-new-ia" passHref>
                    <Button severity='primary' label='+ Impact Analisis'></Button>
                </Link>
            </Box>
            <div className='border'>
            <DataTable
                        value={rows}
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
                            field="redmineNo" 
                            sortable 
                            header="Redmine No" 
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            field="title" 
                            header="Judul" 
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            field="creator" 
                            sortable 
                            header="Pembuat" 
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            header="Status" 
                            body={(rowData) => (
                                <span 
                                    className={`badge rounded-pill ${
                                        rowData.status == 'Active' 
                                            ? 'bg-success mx-2 px-2' 
                                            : rowData.status === '2' 
                                            ? 'bg-warning text-dark mx-2 px-2' 
                                            : 'bg-secondary mx-2 px-2'
                                    }`}
                                >
                                    {rowData.status == 'Active' ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                            )} 
                            sortable
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            field="createdAt" 
                            sortable 
                            header="Tanggal Buat" 
                            body={(date) => (
                                dateConverter(date.createdAt)
                            )}
                        ></Column>
                        <Column
                        header="Aksi"
                        body={(rowData) => (
                            <Link href={`/ui/home/details/${rowData.id}`}>
                                <Button severity='primary' label='Detail' size={'small'}></Button>
                            </Link>
                        )}
                        ></Column>
                    </DataTable>
                    </div>
        </Box>
    );
}
