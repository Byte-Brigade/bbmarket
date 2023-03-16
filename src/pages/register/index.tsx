import { auth, db } from "@/utils/firebase";
import { useForm } from "@/utils/useForm";
import { IconArrowLeft } from "@tabler/icons-react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { Label } from "flowbite-react";
import { Button, TextInput } from "flowbite-react/lib/esm/components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValue = {
    fullName: "",
    email: "",
    password: "",
  };

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      values.email as string,
      values.password as string
    )
      .then((success) => {
        updateProfile(auth.currentUser as User, {
          displayName: values.fullName,
        }).then(() => {
          console.log("name set");
        });
        const data = {
          fullName: values.fullName,
          email: values.email,
          uid: success.user.uid,
        };
        // save to localstorage
        localStorage.setItem("user", JSON.stringify(data));
        // save to firebase
        set(ref(db, `users/${success.user.uid}/`), data);

        setIsLoading(false);
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const registerCallback = () => {
    setIsLoading(true);
    register();
  };

  const { onChange, onSubmit, values } = useForm(
    initialValue,
    registerCallback
  );

  return (
    <>
      <Head>
        <title>BBMarket - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="w-96 bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden">
          <div className="p-4 border-b border-slate-300 text-center">
            <h1 className="text-2xl font-semibold">Register</h1>
          </div>
          <div className="p-4">
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="fullName" value="Your full name" />
                </div>
                <TextInput
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={onChange}
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  name="email"
                  type="email"
                  placeholder="name@email.com"
                  onChange={onChange}
                  required={true}
                />
              </div>
              <div className="mb-4">
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  name="password"
                  type="password"
                  onChange={onChange}
                  required={true}
                />
              </div>
              {isLoading ? (
                <Button disabled={true}>Redirecting ...</Button>
              ) : (
                <Button
                  type="submit"
                  onClick={() => console.log("registering")}
                >
                  Create Account
                </Button>
              )}
            </form>
            {isLoading ? (
              ""
            ) : (
              <div className="flex items-center text-sm justify-between mt-4">
                <Link href="/">
                  <div className="flex items-center gap-x-2 hover:text-sky-500 transition-colors duration-300">
                    <IconArrowLeft />
                    <span>Back to home</span>
                  </div>
                </Link>
                <div className="flex gap-x-2 items-center">
                  <p className="font-semibold text-gray-500">
                    Already registered?
                  </p>
                  <div className="hover:text-sky-500 transition-colors duration-300 underline">
                    <Link href="/login">Login</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
