'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import EditorConvertToHTML from './EditorConvertToHTML';  // Ensure correct import path
import { postData } from '../utils/network';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

export default function Inputan({ values = [], url, backUrl }) {
    console.log(values);
    const router = useRouter();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        let isMounted = true;
        
        if (values.length > 0 && isMounted) {
            const initialData = values.reduce((acc, val) => ({
                ...acc,
                [val.name]: ''
            }), {});
            setFormData(initialData);
        }
    
        return () => {
            isMounted = false;
        };
    }, [values]);
    

    const handleChange = (name, value, isMulti = false) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: isMulti ? value.join(', ') : value, // Join array values as a comma-separated string if `isMulti` is true
        }));
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        // setTimeout(async () => {
            const resp = await postData(url, formData)
            console.log(resp);
            router.push('/ui/home')
            if(resp.status == 200 ){
                redirect(`${backUrl}`)
            } else {
                console.log(resp);
            }
        // }, 3000)
    };

    return (
        <form onSubmit={handleSubmit}>
            {values.length > 0 ? (
                values.map((val, key) => (
                    <div key={key} className="form-group row mb-3">
                        <label className="label-form-col col-md-4">
                            <div className='bg-dark text-light p-1'>
                            {val.title.toUpperCase()}
                            </div>
                        </label>
                        <div className="col-md-8">
                            {val.tipe === 1 ? (
                                <EditorConvertToHTML
                                    name={val.name}
                                    content={formData[val.name] || null}  // Pass initial content if any
                                    onContentChange={(name, content) => handleChange(name, content)}
                                />
                            ) : val.tipe === 2 ? (
                                <select
                                    className="form-control"
                                    multiple={val.isMulti}
                                    name={val.name}
                                    onChange={(e) =>
                                        handleChange(
                                            val.name,
                                            val.isMulti
                                                ? Array.from(e.target.selectedOptions, option => option.value) // Convert to array if multiple
                                                : e.target.value,
                                            val.isMulti
                                        )
                                    }
                                    value={val.isMulti ? formData[val.name] || [] : formData[val.name] || ''} // Ensure array for multiple
                                >
                                    {val.element.map((valx, keyx) => (
                                        <option key={keyx} value={valx.id}>{valx.name}</option>
                                    ))}
                                </select>
                            ) : val.tipe === 0 ? (
                                <input
                                    className="form-control"
                                    type="text"
                                    name={val.name}
                                    value={formData[val.name] || ''}
                                    onChange={(e) => handleChange(val.name, e.target.value)}
                                    placeholder={val.title.toUpperCase()}
                                    required
                                />
                            ) : val.tipe === 3 ? (
                                val.option.map((valo, keys) => (
                                    <div key={keys}>
                                        <input
                                            className="mx-1"
                                            type="radio"
                                            id={valo.id}
                                            name={val.name}
                                            value={valo.option}
                                            checked={formData[val.name] === valo.option}
                                            onChange={() => handleChange(val.name, valo.option)}
                                        />
                                        <label htmlFor={valo.id}>{valo.name.toUpperCase()}</label>
                                    </div>
                                ))
                            ) : null}
                        </div>
                    </div>
                ))
            ) : (
                <p>Please contact support on: 081290669170</p>
            )}
            <div className='row mb-4'>
              <div className='col-md-12 text-end'>
                <Link className='btn btn-md btn-light mx-4' href={backUrl}>Kembali</Link>
                <button className='btn btn-md btn-dark' type="submit">Submit</button>
              </div>
            </div>
        </form>
    );
}
