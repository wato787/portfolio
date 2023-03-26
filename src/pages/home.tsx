import AddInfoButton from "@/components/atoms/ListPage/AddInfoButton";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import InfoCard from "../components/organisms/TopPage/InfoCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ConstructionOutlined } from "@mui/icons-material";
import { UserInfo } from '../types/AddInfoPage/type';

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [listData, setListData] = useState<UserInfo[]>([]);

  useEffect(() => {
    const fetchListData = async () => {
      if (!user) return;

      const usersRef = collection(db, "users");
      const usersQuery = query(usersRef, where("id", "==", user.uid));
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

 

  console.log(listData);

  return (
    <>
      {user ? (
        <>
          <Header />
          <Flex align="center" justify="center" p={6}>
            <Heading as="h2" fontSize={24}>
              <StarIcon color="gray.300" p={1} />
              本日ご来店予定のお客様
              <StarIcon color="gray.300" p={1} />
            </Heading>
          </Flex>
          <Stack pb={{ base: "72px" }}>
            {listData.map((data: UserInfo) => (
              <>
                <InfoCard key={data.id} data={data} />
              </>
            ))}
          </Stack>

          <Footer />
        </>
      ) : (
        <div>未ログイン</div>
      )}
    </>
  );
}

export default Home;
