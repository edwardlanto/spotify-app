import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar';

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>Spotify App 2.0</Head>
      <main>
        <Sidebar />
        {/* Center  */}
      </main>
      <div>
        {/* Player  */}
      </div>
    </div>
  )
}

export default Home
