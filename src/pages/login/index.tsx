import { auth, db } from "@/utils/firebase";
import { useForm } from "@/utils/useForm";
import { IconArrowLeft } from "@tabler/icons-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { Label } from "flowbite-react";
import { Button, TextInput } from "flowbite-react/lib/esm/components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const initialValue = {
    email: "",
    password: "",
  };

  const login = () => {
    signInWithEmailAndPassword(
      auth,
      values.email as string,
      values.password as string
    )
      .then((res) => {
        const dbRef = ref(db);
        // get user data from firebase
        get(child(dbRef, `users/${res.user.uid}/`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              // save user data to local storage
              localStorage.setItem("user", JSON.stringify(snapshot.val()));
              console.log("login success");
              setIsLoading(false);

              router.push("/dashboard");
            } else {
              setIsLoading(false);
              console.log("data not found");
            }
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const loginCallback = () => {
    setIsLoading(true);
    login();
  };

  const { onChange, onSubmit, values } = useForm(initialValue, loginCallback);

  return (
    <>
      <Head>
        <title>BBMarket - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <div className="w-96 bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden">
          <div className="p-4 border-b border-slate-300 text-center">
            <h1 className="text-2xl font-semibold">Login</h1>
          </div>
          <div className="p-4">
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
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
                <Button disabled={true}>Loading ...</Button>
              ) : (
                <Button type="submit" onClick={() => console.log("logging in")}>
                  Login
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
                    Don t have account?
                  </p>
                  <div className="hover:text-sky-500 transition-colors duration-300 underline">
                    <Link href="/register">Register</Link>
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
