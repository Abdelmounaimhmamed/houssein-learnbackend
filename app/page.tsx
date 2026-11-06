"use client";
import { useState } from "react";
import { z, ZodSafeParseError } from "zod";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ValidationSchema = z.object({
  email: z.string().email("email must be email").min(6).max(40),
  password: z.string().min(4).max(12),
});

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // prepare data :
    console.log(email);
    console.log(password);
    const formData = { email: email, password: password };

    console.log(formData);

    const resultatValidation = ValidationSchema.safeParse(formData);

    if (!resultatValidation.success) {
      // toast toast react
      //console.log(resultatValidation.error.flatten().fieldErrors.password)
      const errorMessage = resultatValidation.error.flatten()?.fieldErrors; // invalid indetiefier
      console.log(errorMessage); // error
      const errorEmail = errorMessage.email;
      const errorPassword = errorMessage.password;

      if (errorEmail) toast.error(`Email : ${errorEmail?.[0]}`);
      if (errorPassword) toast.error(`Password : ${errorPassword?.[0]}`);
      return;
    }

    try {
      const request = await axios.post("/api/user", formData);
      console.log("Message renvoye :", request.data.message);
      console.log("data :", request.data.data.email?.[0]);
    } catch (error) {
      console.log("Erreur axios.post");
    }
  };

  return (
    <div>
      <Toaster position="top-left" reverseOrder={false} />

      <form onSubmit={HandleSubmit}>
        <label htmlFor="Email"></label>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="idEmail"
        />

        <label htmlFor="Password"></label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          name="password"
          id="idPassword"
        />

        <button type="submit"> Submit</button>
      </form>
    </div>
  );
}
