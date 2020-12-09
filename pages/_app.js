import React from 'react'

import '../styles/index.css'
import { JobProvider } from '../components/jobs/JobProvider'

function MyApp({ Component, pageProps }) {
  return (
    <JobProvider>
      <Component {...pageProps} />
    </JobProvider>
  )
}

export default MyApp
