import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { auth } from "../../firebase";
import { UserInfo } from "../types/AddInfoPage/type";
import InfoCard from "../components/organisms/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { useListData } from "@/hooks/useListData";

function Home() {
  const listData: UserInfo[] = useListData();
  const user = auth.currentUser;

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
              {listData.map((data: UserInfo) => (
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
