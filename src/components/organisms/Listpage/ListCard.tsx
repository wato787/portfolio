import CardDetailButton from "../../atoms/ListPage/CardDetailButton";
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

export default function ListCard() {
  return (
    //      来店回数に応じて色を変える
    <Center py={4}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{base:"150px", sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex align="center" justify="center" flex={1} bg="black">
          <Avatar
            size={{base:"xl",md:"2xl"}}
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
          <Heading fontSize={{base:"1xl",md:"2xl"}} fontFamily={"body"}>
            名前
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" >
            ニックネーム
          </Text>

          <Stack
            width={"100%"}
            direction={"row"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <CardDetailButton />
          </Stack>
        </Stack>
      </Stack>
    </Center>
  );
}
