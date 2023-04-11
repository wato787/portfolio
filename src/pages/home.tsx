import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { auth } from "../../firebase";
import { TodayUserInfo } from "../types/type";
import InfoCard from "../components/organisms/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";

import { useTodayUserData } from "@/hooks/useTodayUserData";

function Home() {


  const todayList = useTodayUserData();
  const user = auth.currentUser;

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
              {todayList.map((data: TodayUserInfo) => (
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

