import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { child, get, ref } from "firebase/database";
import { auth, db } from "../firebase";
import { FormData } from "../types/FormData";

export const useAuth = () => {
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("logout success");
        localStorage.removeItem("user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = (values: FormData) => {
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
            } else {
              console.log("data not found");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    logout,
    login,
  };
};
