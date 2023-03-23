import AddInfoButton from "@/components/atoms/ListPage/AddInfoButton";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import InfoCard from "../components/organisms/TopPage/InfoCard";
import useAuth from "@/hooks/useAuth";


export default function Home() { 
  useAuth();
  return (
    <>
      <Header />
    
      {/* 当日のお客さまリスト */}
      <Flex align="center" justify="center"  p={6}>
        <Heading as="h2" fontSize={24}>
          <StarIcon color="gray.300" p={1} />
          本日ご来店予定のお客様
          <StarIcon color="gray.300" p={1} />
        </Heading>
      </Flex>
      {/* <p>メモ：カレンダーから当日のお客さまを取得して時間で降順に並べる。来店済みボタンを押したら表示されなくなるor色を変える+来店回数を１増やす。来店回数に応じて背景色を変える</p> */}
      <Stack pb={{base:"72px"}}>
        <InfoCard />
        <InfoCard />
        <InfoCard />
      </Stack>

      <Footer />
    </>
  );
}
