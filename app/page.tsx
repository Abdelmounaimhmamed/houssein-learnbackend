"use client"
import { useState } from "react";
import {z, ZodSafeParseError} from "zod"
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

const ValidationSchema = z.object({
  email: z.string().email("email must be email").min(6).max(40),
  passowrd: z.string().min(4).max(12)
})

 
export default function Home() {

  const [email, setEmail] = useState("");
  const [password , setPassword] = useState("");

  const HandleSubmit = async (event: any) => {
    event.preventDefault();

    // prepare data : 
    console.log(email)
    console.log(password);
    const formData  =  {email: email, password: password};


    console.log(formData);




    const resultatValidation = ValidationSchema.safeParse(formData);
   
    if (!resultatValidation.success) {
      // toast toast react 
      const errorMessage = resultatValidation.error.flatten()?.fieldErrors?.email?.[0]; // invalid indetiefier
      console.log(errorMessage); // error
      toast.error(`Error  ${errorMessage}`);

    }

    const request = await axios.post("/api/user", formData);


  }

  return (
   <div>
     <Toaster position="top-left"
  reverseOrder={false}  />
      <form onSubmit={HandleSubmit}>
        <label htmlFor=""></label>
        <input onChange={(e) => setEmail(e.target.value)} type="email" name="" id="" />

        <label htmlFor=""></label>
        <input onChange={(e) => {setPassword(e.target.value)}} type="password" name="" id="" />

        <button type="submit"> Submit</button>
      </form>
    
    </div>
  );
}
