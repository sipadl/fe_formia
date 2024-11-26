'use client'
import { Outputan, SignaturePad } from '@/app/component';
import { fetchData } from '@/app/utils/network';
import { useEffect, useState } from 'react';


export default function page() {
    const router = window.location.pathname.split('/');
    const id = router[4] || 1;
    console.log(id);
    const [detail, setDetail] = useState([]);
    const [groupHead, setGroupHead] = useState([]);
    useEffect(() => {
         const getData = async () => {
            const res = await fetchData(`/api/ia/detail/${id}`)
            setDetail(res.data)
        }
         const getDataGh = async () => {
            const res = await fetchData(`/api/main/gh/list/signature/${id}`)
            console.log(res);
            setGroupHead(res.data)
        }

        getDataGh();
        getData();
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
                        output: detail.title
                    }, {
                        title: 'No Redmine',
                        name: 'redmineNo',
                        customTipe:'number',
                        tipe: 0,
                        output: detail.redmineNo
                    }, {
                        title: 'Tipe',
                        name: 'tipeIa',
                        tipe: 0,
                        output: detail.tipeIa == 0 ? 'Unregister' : detail.tipeIa == 1 ? 'Incident' : 'Project'
                    }, {
                        title: 'Changes Area',
                        name: 'changes',
                        tipe: 0,
                        output: detail.changes 
                    }, {
                        title: 'Existing Flow',
                        name: 'existingFlow',
                        tipe: 1,
                        output: detail.existingFlow 
                    }, {
                        title: 'Changes Flow',
                        name: 'changesFlow',
                        tipe: 1,
                        output: detail.changesFlow
                    }, {
                        title: 'Testing Requirements',
                        name: 'testingRequirement',
                        tipe: 1,
                        output: detail.testingRequirement
                    }, {
                        title: 'UAT ENV. DATA NEEDS',
                        name: 'envData',
                        tipe: 1,
                        output: detail.envData
                    }, {
                        title: 'data testing',
                        name: 'dataTesting',
                        tipe: 1,
                        output: detail.dataTesting
                    }, {
                        title: 'setup parameter',
                        name: 'parameter',
                        tipe: 1,
                        output: detail.parameter
                    }, {
                        title: 'changes of existing structure file',
                        name: 'existingStructureFile',
                        tipe: 1,
                        output: detail.existingStructureFile
                    }, {
                        title: 'changes of database',
                        name: 'database',
                        tipe: 1,
                        output: detail.database
                    }, {
                        title: 'rekomended action / testing',
                        name: 'recomendedAction',
                        tipe: 1,
                        output: detail.recomendedAction
                    },  {
                        title: 'Downtime required',
                        name: 'downTime',
                        tipe: 0,
                        output: detail.downTime ? 'Yes' : 'No'
                    }, {
                        title: 'Downtime message',
                        name: 'downTimeMsg',
                        tipe: 0,
                        output: detail.downTimeMsg
                    }
                ]}/>
                <SignaturePad values={groupHead} redmine={id} />
        </div>
    )
}
