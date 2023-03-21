import { auth, db } from "@/utils/firebase";
import { useForm } from "@/utils/useForm";
import { IconArrowLeft, IconBrandGoogle } from "@tabler/icons-react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { Label } from "flowbite-react";
import { Button, Spinner, TextInput } from "flowbite-react/lib/esm/components";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const initialValue = {
    fullName: "",
    email: "",
    password: "",
  };

  const saveUserToLocalStorage = (res: UserCredential) => {
    const data = {
      fullName: res.user.displayName,
      email: res.user.email,
      uid: res.user.uid,
    };
    // save to firebase
    set(ref(db, `users/${res.user.uid}/`), data);
    // save to localstorage
    localStorage.setItem("user", JSON.stringify(data));

    setIsLoading(false);
  };

  const provider = new GoogleAuthProvider();
  const registerWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        saveUserToLocalStorage(res);
        toast.success(`Welcome, ${res.user.displayName}`);
      })
      .catch((err) => {
        toast.error(err.code);
        setIsLoading(false);
      });
  };

  const register = () => {
    createUserWithEmailAndPassword(
      auth,
      values.email as string,
      values.password as string
    )
      .then((res) => {
        updateProfile(auth.currentUser as User, {
          displayName: values.fullName,
        }).then(() => {
          console.log("name set");
          saveUserToLocalStorage(res);
          toast.success(`Welcome, ${res.user.displayName}!`);
        });
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.code);
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

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (user) {
    router.push("/dashboard");
    return <div>Redirecting ...</div>;
  }

  if (error) {
    console.log(error);
  }

  return (
    <>
      <Head>
        <title>BBMarket - Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative w-full h-screen">
        <div className="absolute inset-x-0"></div>
        <div className="flex items-center justify-center min-h-screen bg-slate-100">
          <div className="overflow-hidden bg-white border shadow-xl w-96 rounded-xl border-slate-300">
            <div className="p-4 text-center border-b border-slate-300">
              <h1 className="text-2xl font-semibold">Register</h1>
            </div>
            <div className="p-4">
              <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                <div>
                  <div className="block mb-2">
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
                  <div className="block mb-2">
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
                </div>
                {isLoading ? (
                  <Button disabled={true}>Loading ...</Button>
                ) : (
                  <Button
                    type="submit"
                    onClick={() => console.log("registering")}
                  >
                    Create Account
                  </Button>
                )}
              </form>
              <div className="flex flex-col w-full mt-4">
                <Button onClick={registerWithGoogle}>
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
                      Already registered?
                    </p>
                    <div className="underline transition-colors duration-300 hover:text-sky-500">
                      <Link href="/auth/login">Login</Link>
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
