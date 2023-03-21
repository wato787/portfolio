import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { CgUserList } from 'react-icons/cg'

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
          <Link href='/home'>
          <Box>
            <Heading sx={{ fontFamily: "Libre Baskerville" }}  as="h1" fontSize="4xl" fontWeight={"normal"}>
              Envy
            </Heading>
          </Box>
          </Link>
          <Box>
            <Flex align="center" columnGap="20px" fontSize="1xl">
              <Link href="/list"><CgUserList size={30}/></Link>

              <Link href="/calendar"><CalendarIcon boxSize={6}/></Link>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
