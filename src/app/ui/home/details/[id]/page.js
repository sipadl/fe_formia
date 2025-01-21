'use client'
import { Outputan, SignaturePad } from '@/app/component';
import { fetchData } from '@/app/utils/network';
import { useEffect, useState } from 'react';


export default function Page() {
    const router = window.location.pathname.split('/');
    const id = router[4] || 1;
    const [detail, setDetail] = useState({});
    const [groupHead, setGroupHead] = useState([]);
    const [changes, setChanges] = useState([]);

    const mappingChangesArea = (values) => {
        const hasil = [];
        const newVal = values ? JSON.parse(values) : [];
        changes.map((val, index) => {
            for (let i = 0; i < newVal.length; i++) {
                if(newVal[i] == val.id){
                    hasil.push(`${val.name}, `)
                }      
            }
        })
        return hasil
    }
    

    useEffect(() => {
        // setTimeout(() => {
            const getData = async () => {
                const res = await fetchData(`/api/ia/detail/${id}`)
                setDetail(res.data)
                if(res.data){
                    const gh = await fetchData(`/api/main/signature/list/redmine/${res.data.redmineNo}`)
                    setGroupHead(gh.data)
                }
            }

            const changesArea = async () => {
                const response = await fetchData('/api/main/changesArea');
                setChanges(response.data)
            }
                getData();
                changesArea();
        // }, 3000);
    },[id])

    return (
        <div>
            <h4 className='text-center text-uppercase'>Changes Impact Analisis</h4>
            <hr></hr>
            <Outputan
                url={'/api/ia/add'}
                backUrl={'/ui/home'}
                values={[
                    {
                        title: 'Title',
                        name: 'title',
                        tipe: 0,
                        output: detail ? detail.title : ''
                    }, {
                        title: 'No Redmine',
                        name: 'redmineNo',
                        customTipe:'number',
                        tipe: 0,
                        output: detail ? detail.redmineNo : ''
                    }, {
                        title: 'Tipe',
                        name: 'tipeIa',
                        tipe: 0,
                        output: detail ? detail.tipeIa == 0 ? 'Unregister' : detail.tipeIa == 1 ? 'Incident' : 'Project' : ''
                    }, {
                        title: 'Changes Area',
                        name: 'changes',
                        tipe: 0,
                        output: detail ? mappingChangesArea(detail.changes)  : ''
                    }, {
                        title: 'Existing Flow',
                        name: 'existingFlow',
                        tipe: 1,
                        output: detail ? detail.existingFlow  : ''
                    }, {
                        title: 'Changes Flow',
                        name: 'changesFlow',
                        tipe: 1,
                        output: detail ? detail.changesFlow : ''
                    }, {
                        title: 'Testing Requirements',
                        name: 'testingRequirement',
                        tipe: 1,
                        output: detail ? detail.testingRequirement : ''
                    }, {
                        title: 'UAT ENV. DATA NEEDS',
                        name: 'envData',
                        tipe: 1,
                        output: detail ? detail.envData : ''
                    }, {
                        title: 'data testing',
                        name: 'dataTesting',
                        tipe: 1,
                        output: detail ? detail.dataTesting : ''
                    }, {
                        title: 'setup parameter',
                        name: 'parameter',
                        tipe: 1,
                        output: detail ? detail.parameter : ''
                    }, {
                        title: 'changes of existing structure file',
                        name: 'existingStructureFile',
                        tipe: 1,
                        output: detail ? detail.existingStructureFile : ''
                    }, {
                        title: 'changes of database',
                        name: 'database',
                        tipe: 1,
                        output: detail ? detail.database : ''
                    }, {
                        title: 'rekomended action / testing',
                        name: 'recomendedAction',
                        tipe: 1,
                        output: detail ? detail.recomendedAction : ''
                    },  {
                        title: 'Downtime required',
                        name: 'downTime',
                        tipe: 0,
                        output: detail ? detail.downTime ? 'Yes' : 'No' : ''
                    }, {
                        title: 'Downtime message',
                        name: 'downTimeMsg',
                        tipe: 0,
                        output: detail ? detail?.downTimeMsg : detail?.downTimeMsg != '' ? detail?.downTimeMsg : '0'
                    }
                ]}/>
                <SignaturePad values={groupHead} redmine={id} />
        </div>
    )
}
