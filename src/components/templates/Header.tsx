import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Button, Container, Flex, Heading } from "@chakra-ui/react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { CgUserList } from "react-icons/cg";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const handleSignOut: any = signOut(auth)
    .then(() => {
      router.push("/");
    })
    .catch((error) => {
      alert(error);
    });
  return (
    <Box backgroundColor="blackAlpha.700" color="white">
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/home">
            <Box>
              <Heading
                sx={{ fontFamily: "Libre Baskerville" }}
                as="h1"
                fontSize="4xl"
                fontWeight={"normal"}
              >
                Envy
              </Heading>
            </Box>
          </Link>
          <Box>
            <Flex align="center" columnGap="20px" fontSize="1xl">
              <Link href="/list">
                <CgUserList size={30} />
              </Link>

              <Link href="/calendar">
                <CalendarIcon boxSize={6} />
              </Link>
              <Button onClick={handleSignOut}>ログアウト</Button>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
