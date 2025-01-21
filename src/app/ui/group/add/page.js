'use client';

import {useRouter} from 'next/navigation';
import {Field, Formik} from 'formik';
import {useEffect, useState} from 'react';
import {Dropdown} from 'primereact/dropdown';
import {Button} from 'primereact/button';
import {FloatLabel} from 'primereact/floatlabel';
import {InputText} from 'primereact/inputtext';
import {fetchData, postData} from '@/app/utils/network';

export default function Page() {
    const router = useRouter();
    const [group, setGroup] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getGrup = async () => {
            try {
                const response = await fetchData('/api/user/get');
                const groups = response
                    .data
                    .map((group) => ({label: group.namaLengkap, value: group.id}));
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
            <div className="h4">Tambah Group</div>
            <hr className="mx-4"/>
            <Formik
                initialValues={{
                    name: '',
                    position: '',
                    user: ''
                }}
                onSubmit={async (values) => {
                    values['userId'] = selectedUser
                    values['position'] = selectedGroup
                    const response = await postData('/api/main/group/new', values)
                    if (response.status === 200) {
                        router.push('/ui/group/list');
                    }
                }}>
                {
                    ({handleSubmit, handleReset}) => (
                        <form onSubmit={handleSubmit} onReset={handleReset}>
                            <FloatLabel className="mb-4 mt-4">
                                <Field
                                    as={InputText}
                                    id="name"
                                    placeholder="Group Name"
                                    name="name"
                                    required="required"
                                    className="w-100"/>
                                <label htmlFor="groupId">Group Name</label>
                            </FloatLabel>
                            <FloatLabel className="mb-4">
                                <Dropdown
                                    value={selectedUser}
                                    id="user"
                                    name="user"
                                    required="required"
                                    placeholder="Pilih Satu"
                                    options={group}
                                    className="w-100"
                                    onChange={(e) => setSelectedUser(e.value)}/>
                                <label htmlFor="groupId">User</label>
                            </FloatLabel>
                            <FloatLabel className="mb-4">
                                <Dropdown
                                    value={selectedGroup}
                                    id="position"
                                    name="position"
                                    required="required"
                                    placeholder="Pilih Satu"
                                    options={[
                                        {
                                            label: "IT",
                                            value: 1
                                        }, {
                                            label: "Risk / Complaince",
                                            value: 2
                                        }
                                    ]}
                                    className="w-100"
                                    onChange={(e) => setSelectedGroup(e.value)}/>
                                <label htmlFor="groupId">Position</label>
                            </FloatLabel>
                            <div className="d-flex justify-content-start mt-4">
                                <Button severity="primary" label="Submit" type="submit"></Button>
                                <Button
                                    severity="secondary"
                                    label="Cancel"
                                    className="mx-2"
                                    type="reset"
                                    onClick={() => {
                                        router.push('/ui/gh/list');
                                    }}></Button>
                            </div>
                        </form>
                    )
                }
            </Formik>
        </div>
    );
}
