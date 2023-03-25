import { useEffect, useState } from "react";
import SearchForm from "@/components/molucules/ListPage/SearchForm";
import ListCard from "@/components/organisms/Listpage/ListCard";
import InfoCard from "@/components/organisms/TopPage/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { Flex } from "@chakra-ui/react";
import AddInfoButton from "@/components/atoms/ListPage/AddInfoButton";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const List = () => {
  const [user, loading, error] = useAuthState(auth);
  const [listData, setListData] = useState<any>([]);
console.log(listData)
  useEffect(() => {
    const fetchListData = async () => {
      if (!user) return;

      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("id","==", user.uid));
      const fetchedListData: any[] = [];

      const querySnapshot = await getDocs(usersQuery);

      const promises = querySnapshot.docs.map((userDoc) => {
        const infoRef = collection(doc(db, "users", userDoc.id), "info");
        return getDocs(infoRef);
      });

      const infoSnapshots = await Promise.all(promises);

      infoSnapshots.forEach((infoQuerySnapshot) => {
        infoQuerySnapshot.forEach((infoDoc) => {
          const data = infoDoc.data();
          fetchedListData.push({ ...data, id: infoDoc.id }); 
        });
      });

      setListData(fetchedListData);
    };

    fetchListData();
  }, [user]);

  return (
    <>
      <Header />
      <Flex align="center" justify="center" mt="4">
        <AddInfoButton text={"顧客情報追加"} />
      </Flex>
      <Flex align="center" justify="center" mt={4}>
        <SearchForm />
      </Flex>
      <Flex
        mt={4}
        wrap="wrap"
        align="center"
        justify="center"
        columnGap="24px"
        pb={{ base: "72px" }}
      >
        {listData.map((data:any) => (
          <ListCard data={data} key={data.id} />
        ))}
        <p>ページネーション10こずつ</p>
      </Flex>
      <Footer />
    </>
  );
};

export default List;
