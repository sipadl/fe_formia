"use client";

import { Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { fetchData } from '@/app/utils/network';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { dateConverter } from '@/app/utils/ConverterDate';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';

export default function Page() {
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]);
    const [session, setSession] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { value: null, matchMode: FilterMatchMode.EQUALS },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    });

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await fetchData('/api/ia/list?size=300&sort=id,createdAt&mode=user');
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
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const _token = sessionStorage.getItem('_token');
        if (_token) {
            if (!session) {
                setSession(true);
            }
            if (!rows) {
                fetchDataAsync();
            }
        }
    }, [session, rows]);


    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let newFilters = { ...filters };
        newFilters['global'].value = value;
        setFilters(newFilters);
        setSearchValue(value);
    };

    const header = (
        <div className="table-header d-flex align-items-center">
            <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                    <i className="pi pi-search" />
                </span>
                <InputText
                    value={searchValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Cari redmine"
                    className="w-100"
                />
            </div>
        </div>
    );

    return (
        <Box sx={{ padding: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h5">List Impact Analisis</Typography>
            </Box>
            <div className='border'>
            <DataTable
                value={rows}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                showGridlines={true}
                filters={filters}
                globalFilterFields={['redmineNo', 'createdAt', 'title']}
                header={header}
                loading={loading}
                emptyMessage="No records found."
            >
                        <Column 
                            header="No" 
                            body={(rowData, options) => options.rowIndex + 1} 
                        ></Column>
                        <Column 
                            field="redmineNo" 
                            header="Redmine No" 
                            sortable={true}
                        ></Column>
                        <Column 
                            field="title" 
                            header="Judul" 
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            field="creator" 
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
                            // style={{ width: '30%' }}
                        ></Column>
                        <Column 
                            field="createdAt" 
                            header="Tanggal Buat" 
                            sortable={true}
                            body={(date) => (
                                dateConverter(date.createdAt)
                            )}
                        ></Column>
                        <Column
                        header="Aksi"
                        body={(rowData) => (
                            <>
                            <Link href={`/ui/home/details/${rowData.id}`}>
                                <Button severity='primary' label='Detail' className='mx-1'></Button>
                            </Link>
                            <Link href={`/ui/home/details/${rowData.id}`}>
                                <Button severity='warning' label='Ubah' className='mx-1'></Button>
                            </Link>
                            </>
                        )}
                        ></Column>
                    </DataTable>
                    </div>
        </Box>
    );
}
