
import { Button, CloseButton, IconButton, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { TodayUserInfo } from "../../types/type";
import {
  Avatar,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
 
} from "@chakra-ui/react";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";


export default function InfoCard({ data}: { data: TodayUserInfo }) {
  const router = useRouter();
  const user = auth.currentUser;
  const [visit,setVisit]=useState<number>(data.visits);
  const [isLoading, setIsLoading] = useState(false);


  const handleVisitsClick = async () => {
    const infoDocRef = doc(db, "users", user!.uid, "info", data.id);
    const updateData:{visits:number} = {
      visits: data.visits + 1, // 来店回数を1増やす
    };
    await updateDoc(infoDocRef, updateData);
    setVisit(updateData.visits)
    setIsLoading(true);
  };

// 来店回数に応じて色変更
const bgColor = visit === 0 ? "white" : visit! < 5 ? "gray.300" : visit! < 10 ?"gray.600" :"gray.900";
const fontColor = visit === 0 ? "black" : visit! < 5 ? "white" :"white";

  return (

    <>
      <p>-{data.start}-</p>
      <Center py={4} position="relative">
      {isLoading && (
          <Center
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="rgba(255,255, 255, 0.9)"
            zIndex={10}
          >
            <Text>来店済み</Text>
            <CloseButton  position="absolute" top={6} right={12} onClick={()=>setIsLoading(false)}/>
          </Center>
        )}
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ base: "300px", sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "row", md: "row" }}
          boxShadow={"2xl"}
          padding={4}
          bg={bgColor}
        >
          <Flex align="center" justify="center" flex={1} bg="black">
            <Avatar size="2xl" name="Segun Adebayo" src={data.facePhotos[0]} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading color={fontColor} fontSize={"2xl"} fontFamily={"body"}>
              {data.name}
            </Heading>
            <Text color={fontColor} fontWeight={600} size="sm" mb={4}>
              {data.nickname}
            </Text>
            <Text color={fontColor}>来店回数：{visit}</Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"column"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Button
                px={8}
                fontSize={"sm"}
                rounded={"full"}
                _focus={{
                  bg: "gray.200",
                }}
                onClick={() => router.push(`list/${data.id}`)}
              >
                詳細
              </Button>
              <Button
                px={6}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={handleVisitsClick}
              >
                来店済み
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
