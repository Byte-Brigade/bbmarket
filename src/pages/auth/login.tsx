import { auth, db } from "@/utils/firebase";
import { useForm } from "@/utils/useForm";
import { IconArrowLeft, IconBrandGoogle } from "@tabler/icons-react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { Label } from "flowbite-react";
import { Button, Spinner, TextInput } from "flowbite-react/lib/esm/components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const initialValue = {
    email: "",
    password: "",
  };

  const saveUserToLocalStorage = (res: UserCredential) => {
    const dbRef = ref(db);
    get(child(dbRef, `users/${res.user.uid}/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // save user data to local storage
          localStorage.setItem("user", JSON.stringify(snapshot.val()));
          console.log("login success");
        } else {
          setIsLoading(false);
          toast.error("data not found");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.code);
      });
  };

  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        saveUserToLocalStorage(res);
        toast.success(`Welcome back, ${res.user.displayName}!`);
      })
      .catch((err) => {
        toast.error(err.code);
      });
  };

  const login = () => {
    signInWithEmailAndPassword(
      auth,
      values.email as string,
      values.password as string
    )
      .then((res) => {
        saveUserToLocalStorage(res);
        toast.success(`Welcome back, ${res.user.displayName}!`);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.code);
      });
  };

  const loginCallback = () => {
    setIsLoading(true);
    login();
  };

  const { onChange, onSubmit, values } = useForm(initialValue, loginCallback);

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (user) {
    router.push("/dashboard");
    return <div>Redirecting ...</div>;
  }

  return (
    <>
      <Head>
        <title>BBMarket - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen">
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
          <div className="overflow-hidden bg-white border shadow-xl w-96 rounded-xl border-slate-300">
            <div className="p-4 text-center border-b border-slate-300">
              <h1 className="text-2xl font-semibold">Login</h1>
            </div>
            <div className="p-4">
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <div>
                  <div className="block mb-2">
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
                <div>
                  <div className="block mb-2">
                    <Label htmlFor="password" value="Your password" />
                  </div>
                  <TextInput
                    name="password"
                    type="password"
                    onChange={onChange}
                    required={true}
                    minLength={6}
                  />
                  <Link href="/auth/login">
                    <span className="mt-2 text-sm transition-colors duration-300 hover:text-sky-500 hover:underline">
                      Forgot Password?
                    </span>
                  </Link>
                </div>
                {isLoading ? (
                  <Button disabled={true}>Loading ...</Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={() => console.log("logging in")}
                  >
                    Login
                  </Button>
                )}
              </form>
              <div className="flex flex-col w-full mt-4">
                <Button onClick={loginWithGoogle}>
                  <IconBrandGoogle />
                  Login with Google
                </Button>
              </div>
              {isLoading ? (
                ""
              ) : (
                <div className="flex items-center justify-between mt-4 text-sm">
                  <Link href="/">
                    <div className="flex items-center transition-colors duration-300 gap-x-2 hover:text-sky-500">
                      <IconArrowLeft />
                      <span>Back to home</span>
                    </div>
                  </Link>
                  <div className="flex items-center gap-x-2">
                    <p className="font-semibold text-gray-500">
                      {`Don\'t have account?`}
                    </p>
                    <div className="underline transition-colors duration-300 hover:text-sky-500">
                      <Link href="/auth/register">Register</Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {isLoading && (
          <div
            id="loader"
            className="absolute inset-0 w-full h-screen bg-gray-600 opacity-25"
          >
            <div className="flex items-center justify-center h-full">
              <Spinner size="xl" color="info" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
