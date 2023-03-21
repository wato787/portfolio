import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { AiOutlineHome } from "react-icons/ai";
import { CgUserList } from "react-icons/cg";
import { CalendarIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      position="fixed"
      bottom={0}
      w="100%"
      zIndex={100}
    >
      <Container maxW={"6xl"} py={2}>
        <Flex justifyContent="center" columnGap={12}>
          <Link href="/home">
            <Flex direction="column" alignItems="center">
              <AiOutlineHome size={30} />
              <Text mt={2} fontSize={12}>
                トップ
              </Text>
            </Flex>
          </Link>
          <Link href="/list">
            <Flex direction="column" alignItems="center">
              <CgUserList size={30} />
              <Text mt={2} fontSize={12}>
                顧客リスト
              </Text>
            </Flex>
          </Link>
          <Link href="/calendar">
            <Flex direction="column" alignItems="center">
              <CalendarIcon mt={1} boxSize={6} />
              <Text mt={2} fontSize={12}>
                カレンダー
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}
