'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';

const Button = dynamic(() => import('primereact/button'), { ssr: false });
const Dropdown = dynamic(() => import('primereact/dropdown'), { ssr: false });
const FloatLabel = dynamic(() => import('primereact/floatlabel'), { ssr: false });
const InputText = dynamic(() => import('primereact/inputtext'), { ssr: false });

export default function Page() {
    const router = useRouter();
    const [group, setGroup] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [loading, setLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        const getGrup = async () => {
            try {
                const response = await fetch('/api/main/group/list');
                const data = await response.json();
                const groups = data.map(group => ({
                    label: group.name,
                    value: group.id
                }));
                setGroup(groups);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching group data:', error);
                setGroup([]);
                setLoading(false);
            }
        };
        getGrup();
    }, []);

    // If data is loading, return a loading state (or a fallback component)
    if (loading) {
        return <div>Loading...</div>;
    }

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
                    try {
                        const response = await fetch('/api/main/departement/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        });
                        const submit = await response.json();
                        if (submit.status === 200) {
                            router.push('/ui/dh/list');
                        }
                    } catch (error) {
                        console.error('Error submitting data:', error);
                    }
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
                                options={group.length ? group : []}
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
