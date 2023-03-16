import { auth } from "@/utils/firebase";
import { UserData } from "@/utils/types/UserData";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [dataUser, setDataUser] = useState<UserData>({
    uid: "",
    displayName: "",
    email: "",
  });

  const [callPush, setCallPush] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        console.log("user signed out");
        if (callPush) {
          return;
        }

        router.push("/login");
        setCallPush(true);
      } else {
        const { uid, displayName, email } = user;
        const data = {
          uid,
          displayName,
          email,
        };
        setDataUser(data);
      }
    });
  }, [router, callPush]);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("logout success");
        localStorage.removeItem("user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>{dataUser.uid}</div>
      <div>{dataUser.displayName}</div>
      <div>{dataUser.email}</div>
      <button onClick={logoutHandler} className="bg-red-600 text-white p-4">
        Log out
      </button>
    </>
  );
}
