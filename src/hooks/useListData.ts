import { useEffect, useState } from "react";
import { collection, doc, getDocs, query, where, CollectionReference, QuerySnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { User } from "firebase/auth";
import { UserInfo } from "@/types/AddInfoPage/type";



export const useListData = (): UserInfo[] => {
  const [user] = useAuthState(auth);
  const [listData, setListData] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchListData = async (currentUser: User | null) => {
      if (!currentUser) return;

      const usersQuery = query(collection(db, "users"), where("id", "==", currentUser.uid));
      const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(usersQuery);
      const promises = querySnapshot.docs.map(async (userDoc: QueryDocumentSnapshot<DocumentData>) => {
        const infoRef: CollectionReference<DocumentData> = collection(doc(db, "users", userDoc.id), "info");
        const infoQuerySnapshot: QuerySnapshot<DocumentData> = await getDocs(infoRef);
        const userInfo: UserInfo[] = infoQuerySnapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({ ...doc.data(), id: doc.id })) as UserInfo[];
        return userInfo;
      });
      
      const infoSnapshots = await Promise.all(promises);
      const fetchedListData = infoSnapshots.flat();
      
      setListData(fetchedListData);
      
    };

    fetchListData(user!);
  }, [user]);

  return listData;
};
