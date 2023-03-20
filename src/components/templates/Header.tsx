import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Box backgroundColor="blackAlpha.700" color="white">
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Heading as="h1">Nailsense</Heading>
          </Box>
          <Box>
            <Flex align="center" columnGap="20px" fontSize="1xl">
            <Link href="/home">トップ</Link>
            <Link href="/list">顧客リスト</Link>
          <Link href="/addInfo">顧客情報追加</Link>

            <Link href="/calendar">カレンダー</Link>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
