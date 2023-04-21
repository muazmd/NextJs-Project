import { ReactElement, SetStateAction } from "react"
import Layout from "@/layout/layout"
import Head from "next/head"
import Link from "next/link"
import styles from '../styles/Login.module.css'
import Image from "next/image"
import { useState } from 'react'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import { Form, Formik, Field, FormikHelpers  } from 'formik'
import * as yup from 'yup'
interface Showtypes {
    password: boolean,
    Cpassword: boolean,
}
const Register = () => {
    const [show, setShow] = useState<Showtypes>({ password: false, Cpassword: false })
    interface MyValuestype {
        username: string,
        email: string,
        password: string,
        Cpassword: string,
    }
    const MyInitValue = {
        username: '',
        email: '',
        password: '',
        Cpassword: '',
    }
    const ValidateSchema = yup.object({
        username: yup.string().required(),
        email: yup.string().email('invalid email').required('Required'),
        password: yup.string().min(6).max(20).required(),
        Cpassword: yup.string().min(6).max(20).required()
    })
    const ValidatePassword = (value: string) => {
        let error
        if (value.includes(' ')) {
            error = 'password should not contain empty spaces'
        }
        return error
    }
  

    return (


        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className="text-gray-800 text-4xl font-bold py-4"> Register</h1>
                <p className="w-3/4 mx-auto text-gray-400">this is random text here </p>
            </div>
            <Formik
                initialValues={MyInitValue}
                onSubmit={(values,
                    { setSubmitting }: FormikHelpers<MyValuestype>) => {

                    setSubmitting(false);
                }}
                validationSchema={ValidateSchema}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col gap-5">
                        <div className={styles.input_group}>
                            <Field
                                className={styles.input_text}
                                type="text"
                                name="username"
                                placeholder="Username" />
                            <span className='icon flex items-center px-4'>
                                <HiOutlineUser size={25} />
                            </span>
                        </div>
                        {errors.username && touched.username && <span className="text-rose-500 text-xs">{errors.username}</span>}

                        <div className={styles.input_group}>
                            <Field

                                className={styles.input_text}
                                type="email"
                                name="email"
                                placeholder="Email" />
                            <span className='icon flex items-center px-4'>
                                <HiAtSymbol size={25} />
                            </span>
                        </div>
                        {errors.email && touched.email && <span className="text-rose-500 text-xs">{errors.email}</span>}

                        <div className={styles.input_group}>
                            <Field
                                className={styles.input_text}
                                type={show.password ? 'text' : 'password'}
                                name="password"
                                placeholder="password"
                                validate={ValidatePassword} />
                            <span className='icon flex items-center px-4' onClick={() => {
                                setShow({ password: !show.password, Cpassword: false })
                            }}>

                                <HiFingerPrint size={25} />
                            </span>
                        </div>
                        {errors.password && touched.password && <span className="text-rose-500 text-xs">{errors.password}</span>}
                        <div className={styles.input_group}>
                            <Field
                                className={styles.input_text}
                                type={show.Cpassword ? 'text' : 'password'}
                                name="Cpassword"
                                placeholder="Confirm password"
                                validate={ValidatePassword} />
                            <span className='icon flex items-center px-4' onClick={() => {

                                setShow({ password: false, Cpassword: !show.Cpassword })
                            }}>

                                <HiFingerPrint size={25} />
                            </span>
                        </div>
                        {errors.Cpassword && touched.Cpassword && <span className="text-rose-500 text-xs">{errors.Cpassword}</span>}

                        <div className="input_button">

                            <button
                                type="submit"
                                className={styles.button}
                            >
                                Register
                            </button>
                        </div>




                    </Form>
                )}
            </Formik>
            <p className="text-center text-gray-400">
                Have an account <Link href={"/Login"}><span className="text-blue-700"> Sign In</span></Link>
            </p>
        </section>
    )
}

Register.getLayout = function PageLayout(page: ReactElement) {
    return (

        <Layout >
            <Head>
                <title>
                    Regiser
                </title>
            </Head>
            {page}
        </Layout>
    )
}
export default Register 