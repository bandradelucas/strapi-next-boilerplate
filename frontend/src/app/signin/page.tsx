'use client'

import React, { useState } from "react"
import { API } from "@/utils/constants"
import { setToken } from "@/utils/helpers"
import { useAuthContext } from "@/contexts/AuthContext"
import { redirect, useSearchParams } from 'next/navigation'
import { signIn } from "next-auth/react"

export default function SignIn() {
  const { setUser } = useAuthContext()

  const [form, setForm] = useState({
    email: 'rukado23@gmail.com',
    password: 'rukado'
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: true,
      callbackUrl: "/",
    });

    console.log(result)


    // try {
    //   const response = await fetch(`${API}/auth/local`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(form),
    //   })

    //   const data = await response.json()
    //   if (data?.error) {
    //     throw data?.error
    //   } else {
    //     setToken(data.jwt)

    //     setUser(data.user)

    //     console.log(`Welcome back ${data.user.username}!`)

    //     // navigate("/profile", { replace: true })
    //   }
    // } catch (error) {
    //   console.error(error)
    // } finally {
    //   console.log('finally')
    // }
  }

  // const handleSignInWithGoogle = () => {
  //   console.log('google')
  //   window.location.href = `${API}/connect/google`
  // }

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl });
  };


  return (
    <div className="flex flex-col gap-4">
      <h1>Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="border"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          className="border"
          placeholder="password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white"
        >
          Submit
        </button>
        <pre className="bg-black text-white">
          <code>
            {JSON.stringify(form, null, 2)}
          </code>
        </pre>
      </form>
      <button
        onClick={() => handleSignIn("google")}
        className="bg-slate-400 w-full"
      >
        Sign In With Google
      </button>
      {/* <button onClick={signIn}>temp</button> */}
    </div>
  )
}
