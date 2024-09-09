'use client';
import { signOut } from "next-auth/react"
export default async function logOut(){
    signOut();
    return( 
    <p>Signed Out Succesfully</p>
);
    

}