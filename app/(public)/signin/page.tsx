'use client'
import { getProviders, signIn } from "next-auth/react"
// import { getServerSession } from "next-auth/next"
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import GoogleSigninButton from "./google_button/page";
import FacebookSigninButton from "./facebook_button/page";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { useRouter } from "next/navigation";

export default function SignIn() {
    // const session = await getServerSession(authOptions);
    const [providers, setProviders] = useState<any>()
    const router = useRouter();

    useEffect(() => {

        const callFun = async () => {
            const providers = await getProviders();
            setProviders(providers)
        }
        callFun()


        const get_session = async () => {
            const fetch_session = await fetch("/api/auth/session")
            const my_session = await fetch_session.json()

            if (!my_session) {
                // router.push("/signin")
            }

            if (my_session?.user?.role === "ADMIN") {
                router.push("/myadmin?msg=admin")
                return;
            }
            const signin_url = sessionStorage.getItem("signin_url") as string

            if (my_session?.user) {
                const form_data = new FormData();
                form_data.set("id", my_session?.user.id);
                const fetch_user = await fetch("/api/myadmin/users/find_user", {
                    method: "POST",
                    body: form_data
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

                    if (my_session?.user?.role === "SELLER") {
                        router.push("/seller?msg=seller")
                        return;

                    }
                    if (my_session?.user?.role === "BUYER") {
                        router.push("/?msg=buyer")
                        return;

                    }
                }
            }
        }
        get_session()

    }, [])

    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h4 className="text-xl md:text-2xl">SEARCH, CHAT, ORDER & RATE</h4>
                        <h1 className="max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                            G1 GARLIC TRADING PLATFORM
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Buy & Sell G1 Garlic all across Pakistan. Chat with Sellers before you place your first order.
                        </p>
                        <div className="  md:flex ">
                            {providers ?
                                Object.values(providers).map((provider: any) => {
                                    return (
                                        <div key={provider?.name} >
                                            <div className="mr-5 mt-5 md:mt-0">
                                                {provider.name == "Google" ?
                                                    <>
                                                        <GoogleSigninButton params={{ provider: provider }} />
                                                    </> : ""}
                                            </div>
                                            <div>
                                                {provider.name == "Facebook" ?
                                                    <>
                                                        <FacebookSigninButton params={{ provider: provider }} />
                                                    </> : ""}
                                            </div>
                                        </div>
                                    )
                                }

                                )
                                : <div>
                                    <Spin /> <span className="ml-2">Please wait...</span>
                                </div>
                            }
                        </div>

                    </div>
                    <div className="mt-10 lg:mt-0 lg:col-span-5 lg:flex">
                        <img src="/images/g1-trade-buy-sell-g1-garlic.jpg" alt="Sell G1 Garlic" className="border border-slate-600" />
                    </div>
                </div>
            </section>




        </>
    )
}


