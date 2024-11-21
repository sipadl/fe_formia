'use client';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { postData } from '../utils/network';
import DOMPurify  from 'dompurify';

export default function Outputan({ values = [], url, backUrl }) {
    const [formData, setFormData] = useState({});
    useEffect(() => {
        let isMounted = true;
        return () => {
            isMounted = false;
        };
    }, []);
    

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
                                <div className='card p-2 bg-light' style={{ minHeight:'10vh' }}>
                                <div dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(val.output)}} />
                                </div>
                            //    <textarea className="form-control" rows={4} disabled={true} value={val.output} />
                            ) : val.tipe === 0 ? (
                                <div className="card p-2 bg-light">
                                    <div className="form-group">{val.output}</div>
                                </div>
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
        </form>
    );
}
