import {Inputan} from '@/app/component'
import React from 'react'

export default function page() {
    return (
        <div>
            <h4 className='text-center text-uppercase'>Changes Impact Analisis</h4>
            <hr></hr>
            <Inputan
                url={'/api/ia/add'}
                backUrl={'/ui/home'}
                values={[
                    {
                        title: 'Title',
                        name: 'title',
                        tipe: 0
                    }, {
                        title: 'No Redmine',
                        name: 'redmineNo',
                        customTipe:'number',
                        tipe: 0
                    }, {
                        title: 'Tipe',
                        name: 'type_ia',
                        tipe: 2,
                        element: [
                            {
                                id:0,
                                name: 'Pilih Satu'
                            },
                            {
                                id: 1,
                                name: 'Incident'
                            }, {
                                id: 2,
                                name: 'Project'
                            }
                        ]
                    }, {
                        title: 'Changes Area',
                        name: 'changes',
                        tipe: 2,
                        element: [
                            {
                                id: 1,
                                name: 'backend'
                            }, {
                                id: 2,
                                name: 'a'
                            }, {
                                id: 3,
                                name: 'b'
                            }
                        ],
                        isMulti: true
                    }, {
                        title: 'Existing Flow',
                        name: 'existingFlow',
                        tipe: 1
                    }, {
                        title: 'Changes Flow',
                        name: 'changesFlow',
                        tipe: 1
                    }, {
                        title: 'Testing Requirements',
                        name: 'testingRequirement',
                        tipe: 1
                    }, {
                        title: 'UAT ENV. DATA NEEDS',
                        name: 'envData',
                        tipe: 1
                    }, {
                        title: 'data testing',
                        name: 'dataTesting',
                        tipe: 1
                    }, {
                        title: 'setup parameter',
                        name: 'parameter',
                        tipe: 1
                    }, {
                        title: 'changes of existing structure file',
                        name: 'existingStructureFile',
                        tipe: 1
                    }, {
                        title: 'changes of database',
                        name: 'database',
                        tipe: 1
                    }, {
                        title: 'rekomended action / testing',
                        name: 'recomendedAction',
                        tipe: 1
                    },  {
                        title: 'Downtime required',
                        name: 'downTime',
                        tipe: 2,
                        element: [
                            {
                                id: null,
                                name: 'Pilih satu'
                            },
                            {
                                id: 1,
                                name: 'Yes',
                                // option: true
                            }, {
                                id: 0,
                                name: 'No',
                                // option: false
                            }
                        ]
                    }, {
                        title: 'Downtime message',
                        name: 'downTimeMsg',
                        tipe: 0
                    }
                ]}/>
        </div>
    )
}
