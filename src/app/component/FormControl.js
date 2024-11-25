import React from 'react';
import { useField } from 'formik';

export default function FormControl({ label, form, val, placeholder = null, name }) {
    // Hook to connect this input with Formik
    const [field, meta] = useField(val);

    return (
        <div className="form-group row">
            <label className={`label-form-col col-md-${label}`}>{name}</label>
            <div className={`col-md-${form}`}>
                <input
                    {...field} // Spread Formik's field properties (name, value, onChange, onBlur)
                    className={`form-control ${meta.touched && meta.error ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                    required={true}
                />
                {meta.touched && meta.error && (
                    <div className="invalid-feedback">{meta.error}</div>
                )}
            </div>
        </div>
    );
}
