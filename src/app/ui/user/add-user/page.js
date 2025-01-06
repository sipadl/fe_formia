'use client'
import { InputWithLabel } from '@/app/component'
import { fetchData, postData } from '@/app/utils/network'
import { Field, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { useEffect, useState } from 'react'

export default function Page() {

  const [departement, setDepartement] = useState([])
  const [role, setRole] = useState([])
  const router = useRouter();

  const [selectedDepartement, setSelectedDepartement] = useState(0);
  const [selectedRole, setSelectedRole] = useState(0);

  useEffect(() => {
    const getRoles = async () => {
      const response = await fetchData('/api/role/get');
      const departement = await fetchData('/api/main/departement/list')
      setDepartement(departement.data)
      setRole(response.data)
    }

    getRoles()
  }, [setDepartement, setRole]);

  return (
    <div>
      <h4>Tambah User Baru</h4>
      <hr />
      <Formik
        initialValues={{
          username: "",
          email: "",
          namaLengkap: "",
          role: "",
          departement: "",
        }}
        onSubmit={async (values) => {
          console.log(values);
          const MainData = {
            username: values.username,
            email: values.email,
            namaLengkap: values.namaLengkap,
            password: 'password',
            role: { id: selectedRole },
            departement: {id: selectedDepartement}
          }

          const submitData = await postData('/api/user/new', MainData);
          router.push('/ui/user/list');
          // console.log("Submitted values:", values);
        }}
      >
        {({ handleSubmit, handleReset, setFieldValue, values }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <>
            {/* Username */}
            <InputWithLabel name="username" label={'Username'} />
            {/* Email */}
            <InputWithLabel name="email"  tipe="email" label="Email" />
            </>

            {/* Nama Lengkap */}
            <div className="mt-4">
            
              <FloatLabel>
              <Field
                as={InputText}
                id="namaLengkap"
                name="namaLengkap"
                required
                className="w-100"
              />
              <label htmlFor="namaLengkap">
                Nama
              </label>
              </FloatLabel>
            </div>

            {/* Role */}
            <div className="mt-5">
              <FloatLabel>
                <Dropdown
                  id="role"
                  name="role"
                  value={selectedRole}
                  options={role}
                  onChange={(e) => setSelectedRole(e.value)} // Mengatur nilai
                  optionLabel="name"
                  optionValue="id"
                  className="w-100"
                  placeholder="Select Role"
                  required
                />
                <label htmlFor="role">Role</label>
              </FloatLabel>
            </div>

            {/* Departement */}
            <div className="mt-5">
              <FloatLabel>
                <Dropdown
                  id="departement"
                  name="departement"
                  value={selectedDepartement}
                  options={departement}
                  onChange={(e) => setSelectedDepartement(e.value)} // Mengatur nilai
                  optionLabel="departementName"
                  optionValue="id"
                  className="w-100"
                  placeholder="Select Departement"
                  required
                />
                <label htmlFor="departement">Departement</label>
              </FloatLabel>
            </div>

            {/* Submit and Reset Buttons */}
            <div className="mt-4">
              <Button type="submit" label="Submit" severity="Primary"></Button>
              <Button
                type="reset"
                label="Cancel"
                className="mx-2"
                severity="Secondary"
                onClick={() => {
                  router.push('/ui/user/list')
                }}
              ></Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
