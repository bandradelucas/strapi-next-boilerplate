'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from "next/link"

export const Navigation = () => {
  const { data: session } = useSession()

  return (
    <>
      <ul className="flex gap-4 justify-center text-sm my-4 text-blue-500">
        <li><Link href="/">Home</Link></li>
        {session?.user ? (
          <>
            {/* <li>{user.username}</li> */}
            <li>{session.user.name}</li>
            <li><img src={session.user.picture} width="48" height="48" alt="" /></li>
            <li><button onClick={() => signOut()}>Logout</button></li>
          </>
        ) : (
          <>
            <li><button onClick={() => signIn()}>Sign In 2</button></li>
            <li><Link href="/signin">Sign In</Link></li>
            <li><Link href="/signup">Sign Up</Link></li>
          </>
        )}
      </ul>
      <pre className="bg-black text-white">
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </>
  )
}