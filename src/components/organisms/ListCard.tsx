import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserInfo } from "../../types/type";
import { Avatar, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import DetailBtn from "../atoms/DetailBtn";

export default function ListCard({ data }: { data: UserInfo }) {
  const router = useRouter();
  // 来店回数で色変更
  const visit = data.visits;
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
    <Center py={3}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ base: "150px", sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={bgColor}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex align="center" justify="center" flex={1}>
          <Avatar
            size={{ base: "xl", md: "2xl" }}
            name="Segun Adebayo"
            src={data.facePhotos[0]}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          pt={1}
        >
          <Heading
            sx={{
              fontFamily: "Klee One",
            }}
            color={fontColor}
            fontSize={{ base: "2xl", md: "2xl" }}
            fontFamily={"body"}
          >
            {data.name}
          </Heading>
          <Text color={fontColor} fontWeight={300} size="sm">
            {data.nickname}
          </Text>
          <Stack
            width={"100%"}
            direction={"row"}
            padding={1}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <DetailBtn data={data}/>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
