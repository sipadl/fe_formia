'use client'
import { ToastPopup } from '@/app/component';
import { fetchData, postData } from '@/app/utils/network';
import { detail, logout } from '@/store/slices/authSlices';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import { TabMenu } from 'primereact/tabmenu';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function ProfilePage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const [error, setError] = useState(null);
    const [details, setDetail] = useState({
        namaLengkap: "",
        username: "",
        created_at: "",
        password: "",
        old_password: "",
        confirmation_password: "",
        departement: "",
        role: "",
        email: ""
    });
    const dispatch = useDispatch();

    const handleError = (message) => {
        setError(message);  // Trigger the error
      };

    // Decode data from localStorage and dispatch to the state
    useEffect(() => {
        setTimeout(() => {
            if (error) {
                setError(null);  // Clear the error after 3 seconds
            }
        }, 3000)

        const getDetail = async () => {
            const detail = await fetchData('/api/user/profile');
            setDetail(detail.data);
        }
        const decodeData = () => {
            const cookieData = sessionStorage.getItem("_cookie");
            if (cookieData) {
                const decodedData = JSON.parse(atob(cookieData));
                dispatch(detail(decodedData));
            }
        };

        getDetail();
        decodeData();
    }, [dispatch, detail, error]);

    const tabItems = [
        {
            label: 'Profile',
            icon: 'pi pi-user'
        }, {
            label: 'Password',
            icon: 'pi pi-key'
        }
    ];

    return (
        <div className="p-4">
            <h4 className="mb-4">Profile</h4>
            {error && <Message severity="error" text={error.message} className="w-100" />}
            <TabMenu
                model={tabItems}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
                className="mb-4"/> {
                activeIndex === 0 && (
                    <div>
                        <Formik
                            onSubmit={(e) => {
                                console.log(e);
                            }}>
                            <form>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <FloatLabel>
                                            <Field
                                                as={InputText}
                                                className='w-100 mb-4'
                                                value={details.namaLengkap || ''}
                                                readOnly={true}
                                                name='namaLengkap'
                                                placeholder='Masukan nama lengkap'/>
                                            <label htmlFor='namaLengkap'>Nama Lengkap</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <FloatLabel>
                                            <Field
                                                as={InputText}
                                                className='w-100 mb-4'
                                                name='username'
                                                value={details.username || ''}
                                                readOnly={true}
                                                placeholder='Masukan username'/>
                                            <label htmlFor='namaLengkap'>Username</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <FloatLabel>
                                            <Field
                                                as={InputText}
                                                className='w-100 mb-4'
                                                name='email'
                                                value={details.email || ''}
                                                readOnly={true}
                                                placeholder='Masukan email'/>
                                            <label htmlFor='namaLengkap'>Email</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <FloatLabel>
                                            <Field
                                                as={InputText}
                                                className='w-100 mb-4'
                                                name='email'
                                                value={details.departement
                                                    ?.departementName || ''}
                                                readOnly={true}
                                                placeholder='Masukan email'/>
                                            <label htmlFor='namaLengkap'>Department</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <FloatLabel>
                                            <Field
                                                as={InputText}
                                                className='w-100 mb-4'
                                                name='username'
                                                value={details.createdAt || ''}
                                                readOnly={true}
                                                placeholder='Masukan username'/>
                                            <label htmlFor='namaLengkap'>Tanggal Daftar</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <FloatLabel>
                                            <Field
                                                as={InputText}
                                                className='w-100 mb-4'
                                                name='username'
                                                value={details.expired_at || ''}
                                                readOnly={true}
                                                placeholder='Masukan username'/>
                                            <label htmlFor='namaLengkap'>Expired At</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-md-12'>
                                        <FloatLabel>
                                            <Field
                                                as={InputText}
                                                className='w-100 mb-4'
                                                name='username'
                                                value={details.role
                                                    ?.name || ''}
                                                readOnly={true}
                                                placeholder='Masukan username'/>
                                            <label htmlFor='namaLengkap'>Role</label>
                                        </FloatLabel>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <Button severity='secondary' label='Kembali' type='reset' onClick={() => router.push('/ui/home')}></Button>
                                </div>
                            </form>
                        </Formik>
                    </div>
                )
            }
            {
                activeIndex === 1 && (
                    <div>
                        <Formik
                            initialValues={{
                                old_password: '',
                                password: '',
                                confirmation_password: ''
                            }}
                            validate={(values) => {
                                const errors = {};
                            
                                // Validate old_password
                                if (!values.old_password) {
                                    errors.old_password = 'Current password is required';  // Fix error message
                                }
                            
                                // Validate password
                                if (!values.password) {
                                    errors.password = 'Password is required';
                                } else if (values.password.length < 8) {
                                    errors.password = 'Password must be at least 8 characters long';
                                }
                            
                                // Validate confirmation_password
                                if (!values.confirmation_password) {
                                    errors.confirmation_password = 'Confirmation password is required';  // Fix error message
                                } else if (values.confirmation_password !== values.password) {
                                    errors.confirmation_password = 'Confirmation password does not match';
                                }
                            
                                return errors;
                            }}
                            onSubmit={ async (values) => {
                                const mainBody = {
                                    currentPassword:values.old_password,
                                    newPassword:values.confirmation_password
                                }
                                const response = await postData('/api/auth/ubah-password', mainBody)
                                if(response.status === 200){
                                    dispatch(logout());
                                }
                                handleError(response);
                            }}>
                             {({ values, errors }) => (
                                <Form>
                                <div className='row mb-4'>
                                    <div className='col-md-12'>
                                    <FloatLabel>
                                        <Field
                                        as={InputText}
                                        className='w-100'
                                        value={values.old_password || ''}
                                        type='password'
                                        name='old_password'
                                        autoComplete='current-password'
                                        placeholder='Enter current password'
                                        />
                                        <label htmlFor='old_password'>Current Password</label>
                                        {errors.old_password ? 
                                        <ErrorMessage
                                        name='old_password'
                                        component='div'
                                        className='text-danger'
                                        />
                                        :''}
                                    </FloatLabel>
                                    </div>
                                </div>

                                <div className='row mb-4'>
                                    <div className='col-md-12'>
                                    <FloatLabel>
                                        <Field
                                        as={InputText}
                                        className='w-100'
                                        value={values.password || ''}
                                        type='password'
                                        name='password'
                                        autoComplete='new-password'
                                        placeholder='Enter new password'
                                        />
                                        <label htmlFor='password'>New Password</label>
                                        {errors.password ? 
                                        <ErrorMessage
                                        name='password'
                                        component='div'
                                        className='text-danger'
                                        /> : '' }
                                    </FloatLabel>
                                    </div>
                                </div>

                                <div className='row mb-4'>
                                    <div className='col-md-12'>
                                    <FloatLabel>
                                        <Field
                                        as={InputText}
                                        className='w-100'
                                        value={values.confirmation_password || ''}
                                        type='password'
                                        name='confirmation_password'
                                        autoComplete='new-password'
                                        placeholder='Confirm new password'
                                        />
                                        <label htmlFor='confirmation_password'>Confirm Password</label>
                                        {errors.confirmation_password ? 
                                        <ErrorMessage
                                        name='confirmation_password'
                                        component='div'
                                        className='text-danger'
                                        />
                                        : ''}
                                    </FloatLabel>
                                    </div>
                                </div>

                                <div className="flex justify-content-end mt-4">
                                    <Button label="Submit" type="submit" severity="primary" className="mx-2"/>
                                    <Button label="Cancel" type="button" severity="secondary" onClick={() => { router.push('/ui/home') }}/>
                                </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                )
            }
        </div>
    );
}
