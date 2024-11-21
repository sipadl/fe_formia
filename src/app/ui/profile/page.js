'use client'
import {Inputan} from '@/app/component';
import {Formik} from 'formik';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

export default function page() {
    const [isActived, setIsActived] = useState('profile');
    const [data, setData] = useState({});
    const auth = useSelector((state) => state.auth)
    
    useEffect(() => {
        setData(auth);
    },[data])

    console.log(auth)
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
                        initialValues={{
                            namaLengkap: '',
                            username: '',
                            created_at: ''
                        }}
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
                                        name='namaLengkap'
                                        value={data.namaLengkap}
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
                                        placeholder='Masukan username'/>
                                </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className='btn btn-sm btn-light' type='reset'>Kembali</button>
                                <button className='btn btn-sm btn-dark' type='submit'>Ubah Data</button>
                            </div>
                        </form>
                    </Formik>
                </div>
                    : <div>
                            <Formik
                                initialValues={{
                                    old_password: '',
                                    password: '',
                                    confirmation_password: ''
                                }}
                                onSubmit={(e) => {
                                    console.log(e);
                                }}
                                >
                                <form>
                                    <div className='form-group row mb-3'>
                                        <label className='label-form col-md-3'>Password Lama</label>
                                        <div className='col-md-9'>
                                            <input
                                                className='form-control'
                                                type='password'
                                                name='old_password'
                                                placeholder='Masukan password lama'/>
                                        </div>
                                    </div>
                                    <div className='form-group row mb-3'>
                                        <label className='label-form col-md-3'>Password Baru </label>
                                        <div className='col-md-9'>
                                            <input
                                                className='form-control'
                                                type='password'
                                                name='new_password'
                                                placeholder='Masukan password baru'/>
                                        </div>
                                    </div>
                                    <div className='form-group row mb-3'>
                                        <label className='label-form col-md-3'>Konfirmasi Password</label>
                                        <div className='col-md-9'>
                                            <input
                                                className='form-control'
                                                type='password'
                                                name='confirmation_password'
                                                placeholder='Konfirmasi Password'/>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-end'>
                                        <button className='btn btn-sm btn-light' type='reset'>Kembali</button>
                                        <button className='btn btn-sm btn-dark' type='submit'>Ubah Password</button>
                                    </div>
                                </form>
                            </Formik>
                        </div>
            }
        </div>
    )
}
