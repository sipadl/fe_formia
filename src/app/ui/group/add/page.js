'use client';
import { fetchData, postData } from '@/app/utils/network';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';


export default function Page() {
    const router = useRouter();
    const [departement, setDepartement] = useState([]);
    const [listUser, setListUser] = useState([]);

    // useEffect(() => {
    //     const getDepartement = async () => {
    //         const datadepartement = await fetchData('/api/main/departement/list');
    //         setDepartement(datadepartement.data);
    //     };

    //     const getUser = async () => {
    //         const dataUser = await fetchData('/api/user/get');
    //         setListUser(dataUser.data);
    //     };

    //     getDepartement();
    //     getUser();
    // }, []);

    return (
        <div>
            <div className="h4 mb-3">Tambah Group</div>
            <Formik
                initialValues={{
                    name: '',
                    position: '',
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.name) errors.name = 'Nama is required';
                    if (!values.position) errors.position = 'Position is required';
                    return errors;
                }}
                onSubmit={async (values) => {
                    try {
                        const submit = await postData('/api/main/group/new', values);
                        router.push('/ui/group/list');
                    } catch (error) {
                        console.error('Submission error:', error);
                    }
                }}
            >
                {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        {/* Nama Field */}
                        <div className="form-group mb-4">
                            <label className="mb-2">Nama</label>
                            <InputText
                                className={`w-100 ${errors.name && touched.name ? 'p-invalid' : ''}`}
                                name="name"
                                placeholder="Masukkan Nama"
                                value={values.name}
                                onChange={(e) => setFieldValue('name', e.target.value)}
                            />
                            {errors.name && touched.name && (
                                <small className="p-error">{errors.name}</small>
                            )}
                        </div>
                        {/* Departement Dropdown */}
                        {/* <div className="form-group mb-4">
                            <label className="mb-2">Departement</label>
                            <Dropdown
                                className={`w-100 ${errors.departement && touched.departement ? 'p-invalid' : ''}`}
                                name="departement"
                                options={departement}
                                optionLabel="departementName"
                                optionValue="id"
                                placeholder="Pilih Departement"
                                value={values.departement}
                                onChange={(e) => setFieldValue('departement', e.value)}
                            />
                            {errors.departement && touched.departement && (
                                <small className="p-error">{errors.departement}</small>
                            )}
                        </div> */}

                        {/* Akun Terkait Dropdown */}
                        {/* <div className="form-group mb-4">
                            <label className="mb-2">Akun Terkait</label>
                            <Dropdown
                                className={`w-100 ${errors.akunTerkait && touched.akunTerkait ? 'p-invalid' : ''}`}
                                name="akunTerkait"
                                options={listUser}
                                optionLabel="namaLengkap"
                                optionValue="id"
                                placeholder="Pilih Akun Terkait"
                                value={values.akunTerkait}
                                onChange={(e) => setFieldValue('akunTerkait', e.value)}
                            />
                            {errors.akunTerkait && touched.akunTerkait && (
                                <small className="p-error">{errors.akunTerkait}</small>
                            )}
                        </div> */}

                        {/* Posisi Dropdown */}
                        <div className="form-group mb-4">
                            <label className="mb-2">Posisi</label>
                            <Dropdown
                                className={`w-100 ${errors.position && touched.position ? 'p-invalid' : ''}`}
                                name="position"
                                options={[
                                    { label: 'IT', value: '1' },
                                    { label: 'Risk', value: '2' },
                                ]}
                                placeholder="Pilih Posisi"
                                value={values.position}
                                onChange={(e) => setFieldValue('position', e.value)}
                            />
                            {errors.position && touched.position && (
                                <small className="p-error">{errors.position}</small>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="d-flex justify-content-end">
                            <Button
                                type="reset"
                                label="Kembali"
                                className="p-button-outlined p-button-secondary me-2"
                            />
                            <Button type="submit" label="Tambah" className="p-button-dark" />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
