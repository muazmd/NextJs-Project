
import { ReactElement } from "react"
import Layout from "@/layout/layout"
import Head from "next/head"
import Link from "next/link"
import styles from '../styles/Login.module.css'
import Image from "next/image"
import { useState } from 'react'
import { getSession, signIn } from "next-auth/react"
import * as yup from 'yup'
import {
    Formik,
    FormikHelpers,
    Form,
    Field,
} from 'formik';
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import { GetServerSideProps } from "next"

const ValidatePassword = (value: string) => {
    let error
    if (value.includes(' ')) {
        error = 'password should not contain empty spaces'
    }
    return error
}
const ValidateSchema = yup.object({
    email: yup.string().email('invalid email').required('Required'),
    password: yup.string().min(6).max(20).required()
})

interface MyFormValues {
    email: string;
    password: string
}

const initialValues: MyFormValues = { email: '', password: '' };


const Login = () => {
    const [show, setShow] = useState(false)


    return (
        <section className='w-3/4 mx-auto flex flex-col gap-10'>
            <div className="title">
                <h1 className="text-gray-800 text-4xl font-bold py-4"> Explore</h1>
                <p className="w-3/4 mx-auto text-gray-400">this is random text here </p>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={ async (values,
                    { setSubmitting }: FormikHelpers<MyFormValues>)  => {
                       const status= await signIn('credentials',{
                            redirect:false,
                            email:values.email,
                            password:values.password,
                            callbackUrl:'/',
                        })
                        console.log(status);

                    setSubmitting(false);
                }}
                validationSchema={ValidateSchema}
            >{({ errors, touched }) => (

                <Form className="flex flex-col gap-5">
                    <div className={`${styles.input_group} ${errors.email && touched.email &&'border-red-400' }   `}>
                        <Field
                            className={styles.input_text}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            validate />
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25} />
                        </span>
                    </div>
                    {errors.email && touched.email && <span className="text-rose-600 text-xs  subpixel-antialiased">{errors.email}</span>}
                    <div className={`${styles.input_group} ${errors.password && touched.password &&'border-red-400' }   `}>
                        <Field

                            className={styles.input_text}
                            type={show ? 'text' : 'password'}
                            name="password"
                            id="password"
                            placeholder="password"
                            validate={ValidatePassword} />
                        <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>

                            <HiFingerPrint size={25} />
                        </span>

                    </div>
                    {errors.password && touched.password && <span className="text-rose-500 text-xs  subpixel-antialiased">{errors.password}</span>}
                    <div className="input_button">

                        <button
                            type="submit"
                            className={styles.button}
                        >
                            Login
                        </button>
                    </div>
                    <div className="input_button">

                        <button
                            type="button"
                            className={styles.button_custom}
                            onClick={(e) => {
                                e.preventDefault();
                                signIn('google', {
                                    callbackUrl: 'http://localhost:3000',

                                })
                            }}
                        >
                            Sign in with Google
                            <Image src={'/assests/google.svg'} width="20" height="20" alt="Google" />

                        </button>
                    </div>
                    <div className="input_button">

                        <button
                            type="button"
                            className={styles.button_custom}
                            onClick={(e) => {
                                e.preventDefault();
                                signIn('github', {
                                    callbackUrl: 'http://localhost:3000',

                                })
                            }}
                        >
                            Sign in with Github
                            <Image src={'/assests/github.svg'} width="20" height="20" alt="Github" />
                        </button>
                    </div>

                </Form>
            )}
            </Formik>
            <p className="text-center text-gray-400">
                dont have an account <Link href={"/Register"}><span className="text-blue-700"> Sign up</span></Link>
            </p>
        </section>

    )
}

export default Login

Login.getLayout = function PageLayout(page: ReactElement) {
    return (

        <Layout >
            <Head>
                <title>Login</title>
            </Head>
            {page}
        </Layout>


    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const Session = await getSession(
        { req }

    )
    console.log(Session)
    if (Session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }

    }
    return {
        props: {
            Session
        },
    }
}