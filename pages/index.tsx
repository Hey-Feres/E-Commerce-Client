/*

  * Page *

  - Description: The Home Page

*/

import React from 'react'
import { useRouter } from 'next/router'
import MainComponent from '../components/shared/MainComponent'

const Home: React.FC = () => {
  const router = useRouter()

  return (
    <MainComponent>
      <button onClick={() => router.push('/Auth/Login')}>Login</button>
    </MainComponent>
  )
}

export default Home