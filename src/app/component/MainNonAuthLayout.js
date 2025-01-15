'use client'
import { detail, login } from '@/store/slices/authSlices'
import { Field, Formik } from 'formik'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { useDispatch } from 'react-redux'
import { postDataWithoutAuth } from '../utils/network'
import { FloatLabel } from 'primereact/floatlabel'
import { useEffect, useState } from 'react'
import ToastPopup from './ToastPopup'
import { Message } from 'primereact/message'


export default function MainNonAuthLayout() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [error, setError] = useState(null);
    const [isToastVisible, setToastVisible] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [dataSubmit, setDataSubmit] = useState({});

    const handleError = (message) => {
        setError(message);  // Trigger the error
        setToastVisible(true);  // Show the toast
      };

    useEffect(() => {
        if (error && isToastVisible) {
            setError(null);  // Clear the error after 3 seconds
            setToastVisible(false);  // Hide the toast
          // Clean up the timeout when the component unmounts or error changes
      }
      if(isSubmit){
        sessionStorage.setItem('_token', dataSubmit.token)
        sessionStorage.setItem('_cookie', btoa(JSON.stringify(dataSubmit)))
      }
    }, [error, isToastVisible, isSubmit])

    return (
        <> 
        {error && isToastVisible && <ToastPopup message={error} severity="error" />}
        <div className = "container vh-100 d-flex align-items-center justify-content-center" > <div
            className="row w-100 shadow-lg p-4 rounded">

            <div className="col-md-6 d-flex flex-column justify-content-center">
                <h2 className="mb-5">Login</h2>
                <div className="mb-4">
                {error && 
                <Message severity="error" text={error.message} className="w-100" />
                }
                </div>
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
                        setSubmitting(true);
                        setTimeout( async () => {
                                setError('');
                                const response = await postDataWithoutAuth('/api/auth/login', values);
                                if(response.status === 200 ){
                                    setIsSubmit(true)
                                    setDataSubmit(response.data)
                                    dispatch(login({detail:response.data}))
                                    dispatch(detail(response.data))
                                    setSubmitting(false);
                                    router.push('/ui/home');
                                } else {
                                    setError(response.response.data)
                                    setSubmitting(false);
                                }
                           
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
                                <div className="mb-4">
                                <FloatLabel>
                                <Field
                                className="w-100"
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    as={InputText}
                                    required
                                    /> 
                                <label htmlFor="username">Username</label>
                                </FloatLabel>
                                {errors.username && touched.username && errors.username}
                                </div>
                                <div className='mb-4'>
                                <FloatLabel>
                                <Field
                                className="w-100"
                                    required
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    as={InputText}
                                    onBlur={handleBlur}
                                    value={values.password}/> 
                                    <label htmlFor="password">Password</label>
                                    {errors.password && touched.password && errors.password}
                                </FloatLabel>
                                </div>
                                <div className='text-end w-100'>
                                    <Button severity='dark' label='Login' className='w-100'></Button>
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