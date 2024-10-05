// src/app/signin.tsx
import {SignIn} from "@/components/Signin";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function login(){
    const session = await auth()
    if (session?.user) redirect('/others')
return(
<div className="flex items-center justify-center min-h-screen bg-gray-100">
<SignIn/>
</div>)
}
