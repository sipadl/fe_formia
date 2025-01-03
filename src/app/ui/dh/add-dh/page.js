'use client';
import { fetchData, postData } from '@/app/utils/network';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { useEffect, useState } from 'react';

export default function Page() {
    const router = useRouter();
    const [group, setGroup] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(() => {
        const getGrup = async () => {
            const {data} = await fetchData('/api/main/group/list')
            const groups = data.map(group => ({
                label: group.name,  // Tampilkan nama
                value: group.id     // Gunakan ID sebagai nilai
            }));
            setGroup(groups);
        }

        getGrup();
    }, [])



    return (
        <div>
            <div className="h4">Tambah Departement</div>
            <hr className="mx-4" />
            <Formik
                initialValues={{
                    departementName: '',
                }}
                onSubmit={async (values) => {
                    values['groupId'] = selectedGroup;
                    const submit = await postData('/api/main/departement/add', values);
                    router.push('/ui/dh/list')
                }}
            >
                {({ handleSubmit, handleReset }) => (
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <FloatLabel className='mb-4 mt-4'>
                         <Field
                            as={InputText}
                            id="departementName"
                            placeholder="Departement Name"
                            name="departementName"
                            required
                            className="w-100"
                            />
                        <label htmlFor='groupId'>Departement Name</label>
                        </FloatLabel>
                        <FloatLabel className="mb-4">
                            <Dropdown
                                value={selectedGroup}
                                id="groupId"
                                name="groupId"
                                required
                                placeholder="Pilih Group"
                                options={group}
                                className="w-100"
                                onChange={(e) => setSelectedGroup(e.value)}
                            />
                            <label htmlFor="groupId">Group</label>
                        </FloatLabel>
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
