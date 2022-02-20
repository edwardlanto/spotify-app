import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '@/components/Sidebar';

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
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
