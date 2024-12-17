import { Field } from 'formik'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import React from 'react'

export default function InputWithLabel({name , label, tipe = 'text'}) {
  return (
    <div className="mt-4">
              <FloatLabel>
              <Field
                as={InputText}
                id="namaLengkap"
                name={name}
                tipe={tipe}
                required
                className="w-100"
              />
              <label htmlFor={name}>
                {label}
              </label>
              </FloatLabel>
            </div>
  )
}
