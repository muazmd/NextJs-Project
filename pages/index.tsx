import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
const inter = Inter({ subsets: ['latin'] })
import { signIn, signOut, getSession, useSession } from 'next-auth/react'
import { getServerSession } from "next-auth/next"
import { GetServerSideProps } from 'next'
import { authOptions } from './api/auth/[...nextauth]'
import { NextAuthHandlerParams } from 'next-auth/core'

export default function Home() {
  // const [session, setSession] = useState(false)
  const { data: session } = useSession()
  return (
    <>
      <Head >
        <title>Home Page</title>
      </Head>
      {session ? authUser({ session }) : GuestPage()}
      {/* {authUser()} */}
    </>
  )
}


const GuestPage = () => {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold"> Guest user HomePage</h3>
      <div className="flex justify-center">
        <Link href={'/Login'}> <span className="mt-5 px-10 py-1 rounded-sm bg-indigo-500">Login </span></Link>
      </div>
    </main>
  )
}
const authUser = ({ session }:any) => {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold"> Authorized user HomePage</h3>
      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>
      <div className="fex justidy-center">
        <button className="mt-5 px-10 py-1 rounded-sm bg-indigo-400"
          onClick={(e) => {
            e.preventDefault();
            signOut({
              callbackUrl: '/Login'
            })
          }}>Sign Out</button>
      </div>
      <div className="flex justify-center">
        <Link href={'/Profile'}> <span className="mt-5 px-10 py-1 rounded-sm ">Profile </span></Link>
      </div>
    </main>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const Session = await getSession(
    {req}

  )
  console.log(Session)
  if (!Session) {
    return {
      redirect: {
        destination: '/Login',
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

