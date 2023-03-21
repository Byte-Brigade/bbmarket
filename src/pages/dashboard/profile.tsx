import DashboardLayout from "@/components/Dashboard";
import { auth } from "@/utils/firebase";
import { useForm } from "@/utils/useForm";
import { IconUserCircle } from "@tabler/icons-react";
import { Button, Label, TextInput } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Profile() {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [user, loading] = useAuthState(auth);
  const initialValue = {
    fullName: "",
    password: "",
  };

  const updateProfileCallback = () => {
    console.log(values);
  };

  const { onChange, onSubmit, values } = useForm(
    initialValue,
    updateProfileCallback
  );

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    router.push("/auth/login");
    return <div>Please sign in to continue</div>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const { files } = e.target;
    if (files && files.length > 0) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <DashboardLayout>
      <Head>
        <title>BBMarket - Dashboard</title>
        <meta name="description" content="Best e-commerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="content" className="p-4 border-2 border-gray-200 rounded-lg">
        <form className="container flex flex-col gap-4" onSubmit={onSubmit}>
          <div>
            <div className="flex items-center justify-center mb-2">
              <div className="relative w-48 h-48 overflow-hidden border-2 border-gray-200 rounded-full">
                {image ? (
                  <Image
                    src={image}
                    className="object-cover max-w-full p-2 rounded-full"
                    alt="profile picture"
                    fill
                  />
                ) : (
                  <div className="flex items-center justify-center text-gray-300">
                    <IconUserCircle className="w-48 h-48" />
                  </div>
                )}
                <div className="absolute top-0 w-full h-full p-2">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-end w-full h-full overflow-hidden rounded-full cursor-pointer opacity-90 hover:opacity-100"
                  >
                    <div className="flex flex-col items-center justify-center w-full bg-gray-100 h-1/4">
                      <p className="mb-2 text-sm text-gray-800 dark:text-gray-400">
                        <span className="font-semibold">Change Image</span>
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleChange}
                      accept=".png, .jpg, .jpeg"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="block mb-2">
              <Label htmlFor="fullName" value="Your Full Name" />
            </div>
            <TextInput
              id="fullName"
              name="fullName"
              type="text"
              defaultValue={user.displayName as string}
              required
              onChange={onChange}
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="email" value="Your Email" />
            </div>
            <TextInput
              id="email"
              type="email"
              value={user.email as string}
              disabled
              readOnly
            />
          </div>
          <div>
            <div className="block mb-2">
              <Label htmlFor="password" value="Your Password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              onChange={onChange}
              required
              minLength={6}
            />
          </div>
          <Button type="submit">Update Profile</Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
