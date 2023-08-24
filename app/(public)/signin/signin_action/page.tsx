'use client'
import { getServerSession } from 'next-auth'
import React, { useEffect } from 'react'
// import TakeAction from './take_action/page'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { headers } from 'next/headers'
import { useRouter } from 'next/navigation'
import { Spin } from 'antd'

export default function SignInAction() {
    // const session = await getServerSession(authOptions)

    // const headerslist = headers()

    const router = useRouter()


    useEffect(() => {

        const get_session = async () => {
            const fetch_session = await fetch("/api/auth/session")
            const my_session = await fetch_session.json()

            if (!my_session) {
                router.push("/signin")
                return;

            }

            if (my_session?.user.role === "ADMIN") {
                router.push("/myadmin?msg=admin")
                return;


            }

            if (my_session?.user) {
                const form_data = new FormData();
                form_data.set("id", my_session?.user.id);
                const fetch_user = await fetch("/api/myadmin/users/find_user", {
                    method: "POST",
                    body: form_data,
                    next: { revalidate: 300 }

                })
                const user_response = await fetch_user.json();
                if (user_response) {
                    const user: User = user_response.data;

                    if (user.phone1 === null || user.phone1 === "" || user.phone2 === null || user.phone2 === "") {
                        router.push("/signin/verify_info")
                        return;
                    }
                    if (my_session?.user.role === "SELLER") {
                        router.push("/seller?msg=seller")
                        return;
                    }

                    const signin_url = sessionStorage.getItem("signin_url") as string

                    if (signin_url !== undefined && signin_url !== "" && signin_url !== null) {
                        sessionStorage.setItem("signin_url", "");
                        router.push(signin_url)
                        return;

                    } else {
                        if (my_session?.user.role === "BUYER") {
                            router.push("/?msg=buyer")
                            return;

                        }
                    }
                }
            }
        }
        get_session()
    }, [])

    return (
        <div className='bg-white text-black p-4' style={{ minHeight: "400px" }}>
            {/* <TakeAction params={{ session }} /> */}
            <div className='flex'>
                <Spin /> <span className='ml-2'>Loading...</span>
            </div>
        </div>
    )
}
