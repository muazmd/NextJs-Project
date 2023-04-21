import Layout from '@/layout/layout'
import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  if (Component.getLayout) {

    return (Component.getLayout(<SessionProvider session={pageProps.session}><Component {...pageProps} />  </SessionProvider>)
    )
  }
  return (
    <SessionProvider session={pageProps.session}>

      <Component {...pageProps} />
    </SessionProvider>

  )
}
