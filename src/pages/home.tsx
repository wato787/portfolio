import AddInfoButton from "@/components/atoms/TopPage/AddInfoButton";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import InfoCard from "../components/organisms/TopPage/InfoCard";

export default function Home() {
  return (
    <>
      <Header />
      {/* 情報の追加ボタン */}
      <Flex align="center" justify="center" mt="4">
        <AddInfoButton text="顧客情報の追加" />
      </Flex>
      {/* 当日のお客さまリスト */}
      <Flex align="center" justify="center" p={6}>
        <Heading as="h2">
          <StarIcon color="gray.300" p={2} />
          本日ご来店予定のお客様
          <StarIcon color="gray.300" p={2} />
        </Heading>
      </Flex>
      <Stack>
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </Stack>

      <Footer />
    </>
  );
}
