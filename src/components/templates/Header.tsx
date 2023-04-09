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
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box
      zIndex={999}
      position={"fixed"}
      top={0}
      w="100%"
      backgroundColor="blackAlpha.900"
      color="white"
    >
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="3"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/home">
            <Box>
              <Heading
                sx={{
                  fontFamily: "Libre Baskerville",
                }}
                as="h1"
                fontSize="3xl"
                fontWeight={"normal"}
                bgGradient="linear(to-b, #007fff, #fff)"
                bgClip="text"
              >
                Ohung
              </Heading>
            </Box>
          </Link>
          <Box>
            <Flex align="center" columnGap="20px" fontSize="1xl">
              <IconButton
                aria-label="Logout"
                colorScheme="black"
                fontSize={24}
                icon={<MdLogout />}
                onClick={onOpen}
              />

              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent mx={6} textAlign={"center"}>
                    <AlertDialogHeader color={"black"} fontSize="lg" fontWeight="bold">
                      ログアウト
                    </AlertDialogHeader>

                    <AlertDialogBody color={"black"}>ログアウトしますか？</AlertDialogBody>

                    <AlertDialogFooter>
                      <Button bg={"#111111"}  ref={cancelRef} onClick={onClose}>
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
