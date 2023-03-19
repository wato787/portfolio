

import CardBadges from "@/components/molucules/ListPage/CardBadges";
import CardButtons from "@/components/molucules/ListPage/CardButtons";
import {

  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function InfoCard() {
  return (
    //      来店回数に応じて色を変える

    <Center py={6}>
      <Stack
        borderWidth="1px"
        borderRadius="lg"
        w={{ sm: "100%", md: "540px" }}
        height={{ sm: "476px", md: "20rem" }}
        direction={{ base: "column", md: "row" }}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        padding={4}
      >
        <Flex flex={1} bg="blue.200">
          <Image
            objectFit="cover"
            alt="image"
            src="https://source.unsplash.com/random"
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
          <Heading fontSize={"2xl"} fontFamily={"body"}>
            名前
          </Heading>
          <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
            ニックネーム
          </Text>
          <Flex direction="column">
            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              趣味:
            </Text>

            <Text
              textAlign={"center"}
              color={useColorModeValue("gray.700", "gray.400")}
              px={3}
            >
              話し方:タメ口or敬語
            </Text>
          </Flex>
          <CardBadges />

          <CardButtons />
        </Stack>
      </Stack>
    </Center>
  );
}
