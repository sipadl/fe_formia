'use client';
import { fetchData, postData } from '@/app/utils/network';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [departement, setDepartement] = useState([]);
    const [listUser, setListUser] = useState([]);


    useEffect(() => {
        const getDepartement = async () => {
            const datadepartement = await fetchData('/api/main/departement/list');
            setDepartement(datadepartement.data)
        }
        const getUser = async () => {
            const dataUser = await fetchData('/api/user/get');
            setListUser(dataUser.data)
        }

        getUser();
        getDepartement();
    }, [setDepartement, setListUser])

    return (
        <div>
            <div className="h4">Tambah Group Head</div>
            <hr className="mx-4" />
            <Formik
                initialValues={{
                    name: '',
                    departement: '',
                    position: '', // Default value for position
                }}
                validate={(values) => {
                    const errors = {};
                    if (!values.name) errors.name = 'Nama Group Head is required';
                    if (!values.departement) errors.departement = 'Departement is required';
                    if (!values.position) errors.position = 'Position is required';
                    return errors;
                }}
                onSubmit={async (values) => {
                    const submit = await postData('/api/main/gh/add', values);
                    console.log(submit)
                    router.push('/ui/gh/list')
                }}
            >
                {({ handleSubmit, handleReset }) => (
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <div className="form-group row mb-3">
                            <label className="label-form col-md-3">Nama</label>
                            <div className="col-md-9">
                                <Field
                                    className="form-control"
                                    name="name"
                                    placeholder="Masukan Nama"
                                />
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label className="label-form col-md-3">Departement</label>
                            <div className="col-md-9">
                                <Field as="select"
                                    className="form-control"
                                    name="departement">
                                        {departement.map((val, index) => {
                                            return (
                                                <option key={index} value={val.id}>{val.departementName}</option>
                                            )
                                        })}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label className="label-form col-md-3">Akun Terkait</label>
                            <div className="col-md-9">
                                <Field as="select"
                                    className="form-control"
                                    name="departement">
                                        {listUser.map((val, index) => {
                                            return (
                                                <option key={index} value={val.id}>{val.namaLengkap}</option>
                                            )
                                        })}
                                </Field>
                            </div>
                        </div>
                        <div className="form-group row mb-3">
                            <label className="label-form col-md-3">Posisi</label>
                            <div className="col-md-9">
                                <Field as="select" className="form-control" name="position">
                                    <option value="1">IT</option>
                                    <option value="2">Risk</option>
                                </Field>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-sm btn-light" type="reset">
                                Kembali
                            </button>
                            <button className="btn btn-sm btn-dark" type="submit">
                                Tambah
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
