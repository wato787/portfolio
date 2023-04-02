import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { auth, db } from "../../firebase";
import { TodayUserInfo, UserInfo, TodayEventData } from "../types/type";
import InfoCard from "../components/organisms/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { useListData } from "@/hooks/useListData";
import { startOfDay, endOfDay, format } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { matchedDataState } from '../Recoil/atom';

function Home() {
  const [todayEvents, setTodayEvents] = useState<TodayEventData[]>([]);
  const listData: UserInfo[] = useListData();
  const [matchedData, setMatchedData] = useRecoilState(matchedDataState);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTodayEvents = async () => {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());

      const eventsRef = collection(db, "users", user!.uid, "events");
      const todayEventsQuery = query(
        eventsRef,
        where("start", ">=", todayStart),
        where("start", "<=", todayEnd)
      );

      const todayEventsSnapshot = await getDocs(todayEventsQuery);
      const todayEventsData = todayEventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TodayEventData[];

      setTodayEvents(todayEventsData);
    };

    if (user) {
      fetchTodayEvents();
    }
  }, [user]);

  useEffect(() => {
    const matched = listData.filter((data) =>
      todayEvents.some((event) => event.title === data.name)
    );

    const matchedWithData = matched.map((data: UserInfo) => {
      const todayEventData = todayEvents.find(
        (event) => event.title === data.name
      );
      const startTime = format(
        new Date(todayEventData!.start.seconds * 1000),
        "HH:mm"
      );
      return {
        ...data,
        start: startTime,
      };
    });

    matchedWithData.sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      }
      if (a.start > b.start) {
        return 1;
      }
      return 0;
    });
    setMatchedData(matchedWithData);
  }, [listData, todayEvents,setMatchedData]);



  return (
    <>
      {user ? (
        <>
          <Header />
          <Box pb={{ base: "88px" }}>
            <Flex align="center" justify="center" p={6}>
              <Heading as="h2" fontSize={24}>
                <StarIcon color="gray.300" p={1} />
                本日ご来店予定のお客様
                <StarIcon color="gray.300" p={1} />
              </Heading>
            </Flex>
            <Stack>
              {matchedData.map((data: TodayUserInfo) => (
                <InfoCard key={data.id} data={data} />
              ))}
            </Stack>
          </Box>
          <Footer />
        </>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </>
  );
}

export default Home;
