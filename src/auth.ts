import NextAuth from "next-auth";
const crypto = require('crypto');
import Credentials from 'next-auth/providers/credentials'
import { ZodError } from "zod"
import { signInSchema } from "./lib/zod"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
         
          credentials: {
            email: { },
            password: {  },
          },
          async authorize(credentials) {
            // This is where you need to retrieve user data 
            // to verify with credentials
            // Docs: https://next-auth.js.org/configuration/providers/credentials
          //  const { usermail, password } = credentials as { usermail: string; password: string };
       
            if (!credentials.password) {
                throw new Error('Passwword is Empty');
              }
            try {
              const { email, password } =
              await signInSchema.parseAsync(credentials)
              // Make a request to your API endpoint with provided credentials
              const apipath= process.env.API_PATH+'userdetails/'+credentials.email
              console.log(apipath)
              const response = await fetch(apipath, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json'
                  }
              });
             console.log(response.status)
              if (response.ok) {
                // If the response is successful (status 200), return user data
              const user = await response.json();
              const hashedpassword=await hashPassword(String(credentials.password))
               console.log(hashedpassword);
               console.log(user[0].password);
               const validuser=(hashedpassword === user[0].password)?user[0]:null;
                console.log(validuser);
                return validuser;
            } else {
                // If the response is not successful, return null
                return null;
            }
        }
        catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
          
            return null
          }
          else{
          // Handle any errors that occur during the request
          console.error('Error verifying user:', error);
          return null;
      }
    }
        } })
      ],
      pages: {
        signIn: '/signin', // Custom sign-in page
      }
})
const hashPassword = (plainPassword: string): Promise<string> => {
  const hash = crypto.createHash('sha256');
  hash.update(plainPassword);
  return hash.digest('hex');
  };

//export { handler as GET, handler as POST,signIn, }