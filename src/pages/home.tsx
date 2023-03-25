import AddInfoButton from "@/components/atoms/ListPage/AddInfoButton";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import InfoCard from "../components/organisms/TopPage/InfoCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function Home() {
  const [user, loading, error] = useAuthState(auth);
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
            <InfoCard />
            <InfoCard />
            <InfoCard />
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
