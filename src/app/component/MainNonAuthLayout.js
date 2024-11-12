'use client'
import {Formik} from 'formik'
import Image from 'next/image'
import React from 'react'
import Inputan from './Inputan'
import { fetchData, postData } from '../utils/network'

export default function MainNonAuthLayout() {
    return (
        <> <div className = "container vh-100 d-flex align-items-center justify-content-center" > <div
            className="row w-100 shadow-lg p-4 rounded">

            <div className="col-md-6 d-flex flex-column justify-content-center">
                <h2 className="mb-4">Login</h2>
                <Formik
                    initialValues={{
                        username: '',
                        password: ''
                    }}
                    // validate={values => {
                    //     const errors = {};
                    //     if (!values.username) {
                    //         errors.username = 'Required';
                    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)) {
                    //         errors.username = 'Invalid username address';
                    //     }
                    //     return errors;
                    // }}
                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout( async () => {
                            const res = await postData('/auth/login', JSON.stringify(values, null, 2));
                            console.log(res);
                            setSubmitting(false);
                        }, 400);
                    }}>
                    {
                        ({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="username"
                                    className='form-control mb-3'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}/> {errors.username && touched.username && errors.username}
                                <input
                                    className='form-control mb-3'
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}/> {errors.password && touched.password && errors.password}
                                <div className='text-end w-100'>
                                    <button type="submit" className='btn btn-dark w-100' disabled={isSubmitting}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        )
                    }
                </Formik>
            </div>
            {/* Right Side: Image */}
            <div className="col-md-6 d-none d-md-block">
                <Image src="https://placehold.co/800" alt="Login" layout="responsive" width={500} height={500} className="rounded" unoptimized="unoptimized"
                    // Bypass optimization for external URL
                />
            </div>
        </div> </div> </>
    )
}