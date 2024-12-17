'use client';
import { fetchData, postData } from '@/app/utils/network';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
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
            <div className="h4">Tambah Departement</div>
            <hr className="mx-4" />
            <Formik
                initialValues={{
                    departementName: '',
                }}
                onSubmit={async (values) => {
                    const submit = await postData('/api/main/departement/add', values);
                    // console.log(submit)
                    router.push('/ui/dh/list')
                }}
            >
                {({ handleSubmit, handleReset }) => (
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                         <Field
                            as={InputText}
                            id="username"
                            name="departementName"
                            required
                            className="w-100"
                        />
                        <div className="d-flex justify-content-start mt-4">
                            <Button severity='primary' label='Submit' type='submit'></Button>
                            <Button severity='secondary' label='Cancel' className='mx-2' type='reset' onClick={() => {
                                router.push('/ui/dh/list')
                            }}></Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
