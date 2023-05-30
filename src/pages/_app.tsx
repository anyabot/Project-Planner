import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from '@/store'
import Layout from '@/components/layout/layout'
import 'bootstrap/dist/css/bootstrap.min.css';

import { extendTheme } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <Provider store={store}>
    <ChakraProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </Provider>
  )
}