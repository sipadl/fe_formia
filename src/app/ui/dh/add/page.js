'use client';

import { useRouter } from 'next/navigation';
import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { fetchData, postData } from '@/app/utils/network';

export default function Page() {
    const router = useRouter();
    const [group, setGroup] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGrup = async () => {
            try {
                const response = await fetchData('/api/main/group/list');
                const groups = response.data.map((group) => ({
                    label: group.name,
                    value: group.id,
                }));
                setGroup(groups);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching group data:', error);
                setGroup([]);
                setLoading(false);
            }
        };
        getGrup();
    }, []);

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
                        const response = await postData('/api/main/departement/add', values)
                        if (response.status === 200) {
                            router.push('/ui/dh/list');
                        }
                    } catch (error) {
                        console.error('Error submitting data:', error);
                    }
                }}
            >
                {({ handleSubmit, handleReset }) => (
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <FloatLabel className="mb-4 mt-4">
                            <Field
                                as={InputText}
                                id="departementName"
                                placeholder="Departement Name"
                                name="departementName"
                                required
                                className="w-100"
                            />
                            <label htmlFor="groupId">Departement Name</label>
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
                            <Button severity="primary" label="Submit" type="submit"></Button>
                            <Button
                                severity="secondary"
                                label="Cancel"
                                className="mx-2"
                                type="reset"
                                onClick={() => {
                                    router.push('/ui/dh/list');
                                }}
                            ></Button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
