import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserInfo } from '../../types/AddInfoPage/type';
import {
  Avatar,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

export default function ListCard({ data }:{data:UserInfo}) {
  const router = useRouter();
  // 来店回数で色変更
  const visit=data.visits;
  const bgColor = visit === 0 ? "white" : visit! < 5 ? "gray.300" : visit! < 10 ? "gray.600" : "gray.900";
  const fontColor = visit === 0 ? "black" : visit! < 5 ? "white" :"white";

  return (
    <Center py={4}>
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
        <Flex align="center" justify="center" flex={1} bg="black">
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
          pt={2}
        >
          <Heading color={fontColor} fontSize={{ base: "1xl", md: "2xl" }} fontFamily={"body"}>
            {data.name}
          </Heading>
          <Text color={fontColor}  fontWeight={600}  size="sm">
            {data.nickname}
          </Text>
          <Stack
            width={"100%"}
            direction={"row"}
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
              onClick={() => router.push(`/list/${data.id}`)}
            >
              詳細
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
