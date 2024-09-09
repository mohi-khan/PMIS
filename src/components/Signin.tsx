import  {signIn}  from "@/auth"
import {z} from 'zod';
const signInSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});
export function SignIn() {
  
  return (
    <form
      action={async (formData) => {
      
        "use server"
        // Convert form data to an object
        const formEntries = Object.fromEntries(formData.entries());
        
        // Validate the form data
        const validation = signInSchema.safeParse(formEntries);

        if (!validation.success) {
          const formattedErrors = validation.error.format();
          console.log(formattedErrors);
          // You can handle the errors as needed (e.g., send them back to the client)
          // For example, you could throw an error or send a response with the errors
          return;
        }
        await signIn("credentials",formData)
      }}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm"
    >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
        
        <input name="email" type="email"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password </label>
        <input name="password" type="password"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign In</button>
    </form>
  )
}