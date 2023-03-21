import CardButtons from "@/components/molucules/ListPage/CardButtons";
import {
  Avatar,
  Center,
  Flex,
  Heading,

  Stack,
  Text,
  useColorModeValue,

} from "@chakra-ui/react";

export default function InfoCard() {
  return (
    //      来店回数に応じて色を変える
      <>
      <p>-13:00-</p>
    <Center py={4}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ base:"300px", sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "row", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex align="center" justify="center" flex={1} bg="black">
          <Avatar
            size="2xl"
            name="Segun Adebayo"
            src="https://source.unsplash.com/random"
          />{" "}
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
            名前
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            ニックネーム
          </Text>
          <Text>来店回数：</Text>

          <CardButtons />
        </Stack>
      </Stack>
    </Center>
    </>

  );
}
