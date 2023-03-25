import CardDetailButton from "../../atoms/ListPage/CardDetailButton";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  Avatar,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ListCard({ data }: any) {
  const router = useRouter();
  console.log(data)
  return (
    //      来店回数に応じて色を変える
    <Center py={4}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ base: "150px", sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex align="center" justify="center" flex={1} bg="black">
          <Avatar
            size={{ base: "xl", md: "2xl" }}
            name="Segun Adebayo"
            src={data.facePhotos}
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
          <Heading fontSize={{ base: "1xl", md: "2xl" }} fontFamily={"body"}>
            {data.name}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm">
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
