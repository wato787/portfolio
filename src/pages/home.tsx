import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Flex, Heading, Spinner, Stack } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { ConstructionOutlined } from "@mui/icons-material";

import { auth, db } from "../../firebase";
import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { UserInfo } from "../types/AddInfoPage/type";
import InfoCard from "../components/organisms/TopPage/InfoCard";
import AddInfoButton from "@/components/atoms/ListPage/AddInfoButton";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { useListData } from "@/hooks/useListData";

function Home() {
  const listData = useListData();

  return (
    <>
      {listData.length > 0  ? (
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
              <InfoCard key={data.id} data={data} />
            ))}
          </Stack>

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
