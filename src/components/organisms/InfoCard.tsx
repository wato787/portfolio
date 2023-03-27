import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { UserInfo } from "../../types/AddInfoPage/type";
import {
  Avatar,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function InfoCard({ data }: { data: UserInfo }) {
  const router = useRouter();

  return (
    //      来店回数に応じて色を変える
    <>
      <p>-13:00-</p>
      <Center py={4}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          w={{ base: "300px", sm: "100%", md: "540px" }}
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "row", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
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
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {data.name}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {data.nickname}
            </Text>
            <Text>来店回数：{data.visits}</Text>

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
