import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { UserInfo } from "../types/type";

const useUserInfo = (url:string) => {
  const [user] = useAuthState(auth);
  const [info, setInfo] = useState<UserInfo>();

  useEffect(() => {
    if (!user) return;

    const getInfo = async () => {
      const q = query(
        collection(db, `users/${user.uid}/info`),
        where("id", "==", url)
      );
      const infoSnapshot = await getDocs(q);
      if (!infoSnapshot.empty) {
        const infoData = infoSnapshot.docs[0].data() as UserInfo;
        setInfo(infoData);
      } else {
        setInfo(undefined);
      }
    };
    getInfo();
  }, [user, url]);

  return info;
};

export default useUserInfo;
