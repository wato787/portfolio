import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { UserInfo } from "../types/AddInfoPage/type";

export const useListData = () => {
  const [user] = useAuthState(auth);
  const [listData, setListData] = useState<any[]>([]);

  useEffect(() => {
    const fetchListData = async (currentUser: any) => {
      if (!currentUser) return;

      const usersQuery = query(collection(db, "users"), where("id", "==", currentUser.uid));
      const querySnapshot = await getDocs(usersQuery);
      const promises = querySnapshot.docs.map(async (userDoc) => {
        const infoRef = collection(doc(db, "users", userDoc.id), "info");
        const infoQuerySnapshot = await getDocs(infoRef);
        const infoData = infoQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        return infoData;
      });

      const infoSnapshots = await Promise.all(promises);
      const fetchedListData = infoSnapshots.flat();

      setListData(fetchedListData);
    };

    fetchListData(user);
  }, [user]);

  return listData;
};
