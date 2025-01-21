'use client'

import { fetchData, postData } from "@/app/utils/network"
import { Field, Form, Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "primereact/button"
import { Editor } from "primereact/editor"
import { useEffect, useState } from "react"

export default function Page() {

    const [changesArea, setChangesArea] = useState([]);
    const [groupHead, setgroupHead] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const getChanges = async () => {
            const response = await fetchData('/api/main/changesArea');
            const ghRes = await fetchData('/api/main/group/list');
            setgroupHead(ghRes.data);
            setChangesArea(response.data);
        }

        getChanges();
    }, []);

    if(groupHead && changesArea) {
    return (
        <div>
            <h4 className='text-center text-uppercase'>Changes Impact Analisis</h4>
            <hr />
            <div className="mb-4" style={{marginBottom: '50px'}}>
                <Formik
                initialValues={{
                    title: '',
                    redmineNo: '',
                    type_ia: '', // This will be an empty string as it's a select (tipe: 2)
                    changes: [], // Since isMulti is true, this is initialized as an empty array
                    existingFlow: '',
                    changesFlow: '',
                    testingRequirement: '',
                    envData: '',
                    dataTesting: '',
                    parameter: '',
                    existingStructureFile: '',
                    database: '',
                    recomendedAction: '',
                    downTime: '', // A select input, defaulting to an empty string
                    downTimeMsg: '0'
                }}
                onSubmit={ async (val) => {
                    val['changes'] = JSON.stringify(val.changes);
                    const response = await postData('/api/ia/add', val);
                    console.log(response);
                    if(response.status === 200) {
                        router.push('/ui/home')
                    }
                }}
                >
                    {({ setFieldValue, values }) => (
            <Form>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Judul
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control'
                            name={'title'}
                            placeholder={`Masukan Judul`}
                            />
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            No Redmine
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control'
                            name={'redmineNo'}
                            placeholder={`Masukan No. Redmine`}
                            />
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Tipe
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        as='select'
                        className='form-control'
                        name={'type_ia'}
                        >
                            <option value={'0'}>Pilih salah satu</option>
                            <option value={'1'}>Incident</option>
                            <option value={'2'}>Project</option>
                        </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Changes Area
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        as='select'
                        className='form-control'
                        name={'changes'}
                        multiple={true}
                        >
                            {changesArea.map((val, index) => (
                                <option key={index} value={val.id}>{val.name}</option>
                            ))}
                        </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Existing Flow
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'existingFlow'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''} // Bind Formik field value
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan Exsiting flow"
                                onTextChange={(content) => form.setFieldValue('existingFlow', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Changes Flow
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'changesFlow'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''}
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan Changes flow"
                                onTextChange={(content) => form.setFieldValue('changesFlow', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Testing Requirements
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'testingRequirement'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''}
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan Testing Requirements"
                                onTextChange={(content) => form.setFieldValue('testingRequirement', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            UAT ENV. DATA NEEDS
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'envData'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''}
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan UAT ENV. DATA NEEDS"
                                onTextChange={(content) => form.setFieldValue('envData', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Data Testing
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'dataTesting'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''}
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan Data Testing"
                                onTextChange={(content) => form.setFieldValue('dataTesting', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Setup Parameter
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'parameter'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''}
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan Setup Parameter"
                                onTextChange={(content) => form.setFieldValue('parameter', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Changes of existing structure file
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'existingStructureFile'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''}
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan changes of existing structure file"
                                onTextChange={(content) => form.setFieldValue('existingStructureFile', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Changes of database
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'database'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                value={field.value || ''}
                                type="text"
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan changes of database"
                                onTextChange={(content) => form.setFieldValue('database', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Recomended action / testing
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        className='form-control h-25'
                            name={'recomendedAction'}
                            >
                            {({field, form}) => (
                                <Editor
                                {...field}
                                type="text"
                                value={field.value || ''}
                                style={{
                                    height: '120px',
                                }}
                                placeholder="Tambahkan Recomended action / testing"
                                onTextChange={(content) => form.setFieldValue('recomendedAction', content.htmlValue)} // Update Formik field value
                              />
                            )}
                            </Field>
                    </div>
                </div>
                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                            Down time
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        as='select'
                        className='form-control'
                        name={'downtime'}
                        onChange={e => setFieldValue('downTime', e.target.value)}
                        >
                            <option value={0}>Pilih salah satu</option>
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </Field>
                    </div>
                </div>
                {values.downTime === '1' && (
                <div className="form-group row mb-3">
                    <label className="label-form-col col-md-4">
                         <div className='bg-dark text-light p-1'>
                             Downtime Message
                         </div>
                     </label>
                     <div className="col-md-8">
                         <Field
                         className='form-control'
                             name={'downTimeMsg'}
                             placeholder={`Masukan Downtime Message`}
                             />
                     </div>
                 </div>
                )}

                <div className="form-group row mb-3">
                   <label className="label-form-col col-md-4">
                        <div className='bg-dark text-light p-1'>
                           Group Head
                        </div>
                    </label>
                    <div className="col-md-8">
                        <Field
                        as='select'
                        className='form-control'
                        name={'grouphead'}
                        >
                            <option value={false}>Pilih salah satu</option>
                            {groupHead.map((val, key) => (
                                <option key={key} value={val.id}>{val.name}</option>
                            ))}
                        </Field> 
                    </div>
                </div>
                <div className="d-flex justify-content-end mt-4">
                   <Link href={'/ui/home'}>
                   <Button severity="secondary" type="reset" label="Kembali" className="mx-2"></Button>
                   </Link>
                   <Button severity="primary" type="submit" label="Submit" ></Button>
                </div>
            </Form>
            )}
            </Formik>
            </div>
        </div>
    )
    } else {
        return (
            <div className="container-fluid">
            loading
            </div>
        )
    }
}
