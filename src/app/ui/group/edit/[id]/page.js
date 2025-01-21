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
    const [setFieldValue, setFieldValues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const id = typeof window !== 'undefined' ? window.location.pathname.split('/').reverse()[0] : null;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch user options
                const response = await fetchData('/api/user/get');
                const groups = response.data.map((group) => ({
                    label: group.namaLengkap,
                    value: group.id,
                }));
                setGroup(groups);

                // Fetch group details for pre-filling
                const groupDetails = await fetchData(`/api/main/group/detail/${id}`);
                console.log(groupDetails)
                if (groupDetails?.data) {
                    const { name, position, userId } = groupDetails.data;

                    // Use setFieldValue to pre-fill fields in Formik
                    setFieldValues({
                        name,
                        position: position || '',
                        userId: userId || '',
                    });
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setGroup([]);
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="h4">Ubah Group</div>
            <hr className="mx-4" />
            <Formik
                initialValues={setFieldValue}
                onSubmit={async (values) => {
                    const response = await postData(`/api/main/group/edit/${id}`, values);
                    if (response.status === 200) {
                        router.push('/ui/group/list');
                    }
                }}
            >
                {({ handleSubmit, handleReset, setFieldValue, values }) => (
                    <form onSubmit={handleSubmit} onReset={handleReset}>
                        <FloatLabel className="mb-4 mt-4">
                            <Field
                                as={InputText}
                                id="name"
                                placeholder="Group Name"
                                name="name"
                                required
                                className="w-100"
                            />
                            <label htmlFor="name">Group Name</label>
                        </FloatLabel>
                        <FloatLabel className="mb-4">
                            <Dropdown
                                value={values.userId}
                                id="userId"
                                name="userId"
                                placeholder="Pilih Satu"
                                options={group}
                                className="w-100"
                                onChange={(e) => setFieldValue('userId', e.value)}
                                required
                            />
                            <label htmlFor="userId">User</label>
                        </FloatLabel>
                        <FloatLabel className="mb-4">
                            <Dropdown
                                value={values.position}
                                id="position"
                                name="position"
                                placeholder="Pilih Satu"
                                options={[
                                    { label: 'IT', value: 1 },
                                    { label: 'Risk / Compliance', value: 2 },
                                ]}
                                className="w-100"
                                onChange={(e) => setFieldValue('position', e.value)}
                                required
                            />
                            <label htmlFor="position">Position</label>
                        </FloatLabel>
                        <div className="d-flex justify-content-start mt-4">
                            <Button severity="primary" label="Submit" type="submit" />
                            <Button
                                severity="secondary"
                                label="Cancel"
                                className="mx-2"
                                type="reset"
                                onClick={() => {
                                    router.push('/ui/group/list');
                                }}
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}
