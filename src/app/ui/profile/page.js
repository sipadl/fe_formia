'use client'
import { detail } from '@/store/slices/authSlices';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function page() {
    const [isActived, setIsActived] = useState('profile');
    const [data, setData] = useState({
        namaLengkap: "",
        username: "",
        created_at: "",
        password: '',
        old_password:'',
        confirmation_password:''
      });
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    // Decode data from localStorage and dispatch to the state
    useEffect(() => {
        const decodeData = () => {
        const cookieData = localStorage.getItem("_cookie");
        if (cookieData) {
            const decodedData = JSON.parse(atob(cookieData));
            dispatch(detail(decodedData)); // Assuming `detail` is an action
        }
        };

        decodeData();
    }, [dispatch]);

    // Update data when `auth.detail` changes
    useEffect(() => {
        if (auth.detail) {
        const { user } = auth.detail;
        setData({
            namaLengkap: user.namaLengkap || "",
            username: user.username || "",
            created_at: user.createdAt || "",
        });
        }
    }, [auth.detail]);


    return (
        <div>
            <div className='mb-4'>
                <h4>Profile</h4>
                <hr/>
            </div>
            <nav className="nav nav-pills flex-column flex-sm-row mb-4">
                <a
                    className={`flex-sm-fill text-sm-center nav-link ${isActived == 'profile'
                        ? 'active dark'
                        : ''}`}
                    onClick={() => setIsActived('profile')}
                    href="#">Profile</a>
                <a
                    className={`flex-sm-fill text-sm-center nav-link ${isActived == 'password'
                        ? 'active'
                        : ''}`}
                    onClick={() => setIsActived('password')}
                    href="#">Password</a>
            </nav>
            {
                isActived == 'profile'
                    ? <div>
                    <Formik
                        onSubmit={(e) => {
                            console.log(e);
                        }}
                        >
                        <form>
                            <div className='form-group row mb-3'>
                                <label className='label-form col-md-3'>Nama Lengkap</label>
                                <div className='col-md-9'>
                                    <input
                                        className='form-control'
                                        value={data.namaLengkap}
                                        readOnly={true}
                                        name='namaLengkap'
                                        placeholder='Masukan nama lengkap'/>
                                </div>
                            </div>
                            <div className='form-group row mb-3'>
                                <label className='label-form col-md-3'>Username</label>
                                <div className='col-md-9'>
                                    <input
                                        className='form-control'
                                        name='username'
                                        value={data.username}
                                        readOnly={true}
                                        placeholder='Masukan username'/>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-sm btn-light' type='reset'>Kembali</button>
                                {/* <button className='btn btn-sm btn-dark' type='submit'>Ubah Data</button> */}
                            </div>
                        </form>
                    </Formik>
                </div>
                    : <div>
                             <Formik
                                initialValues={{
                                    old_password: '',
                                    password: '',
                                    confirmation_password: '',
                                }}
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                                >
                                {() => (
                                    <Form>
                                    <div className="form-group row mb-3">
                                        <label className="label-form col-md-3">Password Lama</label>
                                        <div className="col-md-9">
                                        <Field
                                            className="form-control"
                                            type="password"
                                            name="old_password"
                                            placeholder="Masukan password lama"
                                        />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-3">
                                        <label className="label-form col-md-3">Password Baru</label>
                                        <div className="col-md-9">
                                        <Field
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            placeholder="Masukan password baru"
                                        />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-3">
                                        <label className="label-form col-md-3">Konfirmasi Password</label>
                                        <div className="col-md-9">
                                        <Field
                                            className="form-control"
                                            type="password"
                                            name="confirmation_password"
                                            placeholder="Konfirmasi Password"
                                        />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-sm btn-light" type="reset">
                                        Kembali
                                        </button>
                                        <button className="btn btn-sm btn-dark" type="submit">
                                        Ubah Password
                                        </button>
                                    </div>
                                    </Form>
                                )}
                                </Formik>
                        </div>
            }
        </div>
    )
}
