import { TodayUserInfo } from "../../types/type";
import {
  Avatar,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { auth, db } from "../../../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import DetailBtn from "../atoms/DetailBtn";
import StartLine from "../atoms/StartLine";
import VisitedButton from "../atoms/VisitedButton";

export default function InfoCard({ data }: { data: TodayUserInfo }) {
  const user = auth.currentUser;
  const [visit, setVisit] = useState<number>(data.visits);

  const handleVisitsClick = async (eventId: string) => {
    const infoDocRef = doc(db, "users", user!.uid, "info", data.id);
    const updateData: { visits: number } = {
      visits: data.visits + 1, // 来店回数を1増やす
    };
    await updateDoc(infoDocRef, updateData);
    setVisit(updateData.visits);

    // ホーム画面から表示されなくする
    const eventDocRef = doc(db, "users", user!.uid, "events", data.eventId);
    if (eventId === data.eventId) {
      await updateDoc(eventDocRef, {
        visited: true,
      });
    }
  };

  const cancelVisit = async (eventId: string) => {
    // イベント削除
    const eventDocRef = doc(db, "users", user!.uid, "events", data.eventId);
    if (eventId === data.eventId) {
      await deleteDoc(eventDocRef);
    }
  };

  // 来店回数に応じて色変更
  const bgColor =
    visit === 0
      ? "gray.300"
      : visit! < 5
      ? "gray.600"
      : visit! < 10
      ? "gray.900"
      : "blackAlpha.900";
  const fontColor = visit === 0 ? "black" : visit! < 5 ? "white" : "white";

  return (
    <>
      <StartLine start={data.start} />

      <Center py={4} position="relative">
        <Button
          onClick={() => cancelVisit(data.eventId)}
          size={"xs"}
          bg="#fff"
          color={"#000"}
          top={6}
          left={"12%"}
          position={"absolute"}
        >
          キャンセル
        </Button>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ base: "300px", sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "row" }}
          boxShadow={"2xl"}
          padding={2}
          bg={bgColor}
        >
          <Flex align="center" justify="center" flex={1}>
            <Avatar size="2xl" src={data.facePhotos[0]?data.facePhotos[0]:"https://bit.ly/broken-link"} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading
              color={fontColor}
              sx={{
                fontFamily: "Klee One",
              }}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {data.name}
            </Heading>
            <Text color={fontColor} fontWeight={400} size="sm" mb={4}>
              {data.nickname}
            </Text>
            <Text fontSize={"sm"} color={fontColor}>
              来店回数：{visit} 回
            </Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"column"}
              padding={2}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <DetailBtn data={data} />

              <VisitedButton
                eventId={data.eventId}
                handleVisitsClick={handleVisitsClick}
              />
            </Stack>
          </Stack>
        </Stack>
      </Center>
    </>
  );
}
