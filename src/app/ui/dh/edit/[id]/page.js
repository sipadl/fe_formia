'use client';
import { fetchData, postData } from '@/app/utils/network';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter();
    
    const id = window.location.pathname.split('/').reverse()[0];
    const [data, setData] = useState({
        name: '',
        departement: '',
        position: '', // Default value for position
    });

    useEffect(() => {
        const getDetails = async () => {
            try {
                const details = await fetchData(`/api/main/gh/${id}`);
                setData({name: details.data.name, departement:details.data.departement, position:details.data.position});
            } catch (error) {
                console.error('Error fetching details:', error);
            }
        };

        getDetails();
    }, [id]);

    return (
        <div>
            <div className="h4">Tambah Group Head</div>
            <hr className="mx-4" />
            <Formik
            enableReinitialize
            initialValues={{
                name: data.name || '',
                departement: data.departement || '',
                position: data.position || '', // Pastikan field yang lain juga disesuaikan
            }}
            validate={(values) => {
                const errors = {};
                if (!values.name) errors.name = 'Nama Group Head is required';
                if (!values.departement) errors.departement = 'Departement is required';
                if (!values.position) errors.position = 'Position is required';
                return errors;
            }}
            onSubmit={async (values) => {
                try {
                    console.log("disini", values)
                    await postData(`/api/main/gh/${id}/update`, values);
                    router.push('/ui/gh/list');
                } catch (error) {
                    console.error('Error submitting form:', error);
                }
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
                            <Field
                                className="form-control"
                                name="departement"
                                placeholder="Masukan Departement"
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label className="label-form col-md-3">Posisi</label>
                        <div className="col-md-9">
                            <Field as="select" className="form-control" name="position">
                                <option value="">Pilih Posisi</option>
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
