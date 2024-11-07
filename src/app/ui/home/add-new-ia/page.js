import {Inputan} from '@/app/component'
import React from 'react'

export default function page() {
    return (
        <div>
            <h4 className='text-center text-uppercase'>Changes Impact Analisis</h4>
            <hr></hr>
            <Inputan
                backUrl={'/ui/home'}
                values={[
                    {
                        title: 'Title',
                        name: 'title',
                        tipe: 0
                    }, {
                        title: 'No Redmine',
                        name: 'no_redmine',
                        customTipe:'number',
                        tipe: 0
                    }, {
                        title: 'Tipe',
                        name: 'type_ia',
                        tipe: 2,
                        element: [
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
                        name: 'changes_area',
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
                        name: 'existing_flow',
                        tipe: 1
                    }, {
                        title: 'Changes Flow',
                        name: 'changes_flow',
                        tipe: 1
                    }, {
                        title: 'Testing Requirements',
                        name: 'testing_requirement',
                        tipe: 1
                    }, {
                        title: 'UAT ENV. DATA NEEDS',
                        name: 'env_data',
                        tipe: 1
                    }, {
                        title: 'data testing',
                        name: 'data_testing',
                        tipe: 1
                    }, {
                        title: 'setup parameter',
                        name: 'parameter',
                        tipe: 1
                    }, {
                        title: 'changes of existing structure file',
                        name: 'existing_structure_f',
                        tipe: 1
                    }, {
                        title: 'changes of database',
                        name: 'database',
                        tipe: 1
                    }, {
                        title: 'rekomended action / testing',
                        name: 'recomended_action',
                        tipe: 1
                    }, {
                        title: 'rekomended action / testing',
                        name: 'recomended_action',
                        tipe: 1
                    }, {
                        title: 'rekomended action / testing',
                        name: 'recomended_action',
                        tipe: 1
                    }, {
                        title: 'Downtime required',
                        name: 'down_time',
                        tipe: 2,
                        element: [
                            {
                                id: true,
                                name: 'Yes',
                                // option: true
                            }, {
                                id: false,
                                name: 'No',
                                // option: false
                            }
                        ]
                    }, {
                        title: 'Downtime message',
                        name: 'down_time_msg',
                        tipe: 1
                    }
                ]}/>
        </div>
    )
}
