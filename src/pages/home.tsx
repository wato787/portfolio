import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { auth } from "../../firebase";
import { TodayUserInfo, UserInfo, TodayEventData } from "../types/type";
import InfoCard from "../components/organisms/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { useListData } from "@/hooks/useListData";
import { format } from "date-fns";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { matchedDataState } from "../Recoil/atom";
import { useFetchTodayEvents } from "../hooks/useFetchToadyEvents";

function Home() {
  const listData: UserInfo[] = useListData();
  const [matchedData, setMatchedData] = useRecoilState(matchedDataState);
  const user = auth.currentUser;
  // 今日のイベントを取得
  const todayEvents = useFetchTodayEvents();
  // 昇順に並び替え
  useEffect(() => {
    const matched = listData.filter((data) =>
    todayEvents.some(
      (event) => event.title === data.name && (!event.visited || event.visited !== true)
    )
  );
  const matchedWithData = matched.map((data: UserInfo) => {
    const todayEventData = todayEvents.find(
      (event) => event.title === data.name && (!event.visited || event.visited !== true)
    );
      const startTime = format(
        new Date(todayEventData!.start.seconds * 1000),
        "HH:mm"
      );
      return {
        ...data,
        start: startTime,
        eventId: todayEventData!.id,
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
  }, [listData, todayEvents, setMatchedData]);

  return (
    <>
      {user ? (
        <>
          <Header />
          <Box mt={16} pb={{ base: "88px" }}>
            <Flex align="center" justify="center" p={6}>
              <Heading as="h2" color={"white"} fontSize={20}>
                <StarIcon p={1} />
                本日ご来店予定のお客様
                <StarIcon p={1} />
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
        <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
}

export default Home;
