import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";

import { useRouter } from "next/router";
import { useRef } from "react";
import { MdLogout } from "react-icons/md";

const Header = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

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
              <IconButton aria-label="Logout" colorScheme='teal' icon={<MdLogout/>} onClick={onOpen}>ログアウト</IconButton>

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      ログアウト
                    </AlertDialogHeader>

                    <AlertDialogBody>ログアウトしますか？</AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onClose}>
                        いいえ
                      </Button>
                      <Button colorScheme="red" onClick={handleSignOut} ml={3}>
                        はい
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
