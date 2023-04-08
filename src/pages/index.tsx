import Head from "next/head";

import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import { auth, db } from "../../firebase";
import { useRecoilState } from "recoil";
import { emailState, passwordState } from "@/Recoil/atom";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createEmailState, createPasswordState } from "../Recoil/atom";
import { doc, setDoc } from "firebase/firestore";

// このページのロジック部分もhooksに切り分けてもいいかもしれないですね、
// ロジックの部分が長く感じますね
// あとは初期セットアップ時に作成されているが使用していないファイル（pages/api/）とかも消しましょう！

// ログインページ
export default function Login() {
  const router = useRouter();
  // ログイン情報
  const [email, setEmail] = useRecoilState<string>(emailState);
  const [password, setPassword] = useRecoilState<string>(passwordState);

  const [error, setError] = useState<unknown>("");
  const {
    isOpen: isCreateModalOpen,
    onOpen: onCreateModalOpen,
    onClose: onCreateModalClose,
  } = useDisclosure();
  const {
    isOpen: isResetModalOpen,
    onOpen: onResetModalOpen,
    onClose: onResetModalClose,
  } = useDisclosure();

  // サインアップ情報
  const [createEmail, setCreateEmail] =
    useRecoilState<string>(createEmailState);
  const [createPassword, setCreatePassword] =
    useRecoilState<string>(createPasswordState);

  // メールアドレスとパスワードでログイン
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      router.push("/home");
    } catch (error: unknown) {
      setError(error);
    }
  };

  // ↓eいらないのでは？？
  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    // ↓eいらなければこれもいらないですかね。
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, createEmail, createPassword);
      setCreateEmail("");
      setCreatePassword("");
      // ユーザをFirestoreに保存する
      const user = auth.currentUser;
      const usersRef = doc(db, "users", user!.uid);
      await setDoc(usersRef, {
        id: user!.uid,
        email: createEmail,
      });
      router.push("/home");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("パスワードリセットのメールを送信しました。");
      onResetModalClose();
    } catch (error: unknown) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={"gray.800"}
        pb={{ base: "72px" }}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading
              sx={{
                fontFamily: "Libre Baskerville",
              }}
              as="h1"
              fontSize="5xl"
              fontWeight={"normal"}
              bgGradient="linear(to-b, #007fff, #fff)"
              bgClip="text"
            >
              Ohung
            </Heading>
            {/* クリエイト */}
            <Text
              _hover={{ cursor: "pointer", color: "blue.600" }}
              color={"blue.300"}
              _focus={{ boxShadow: "outline" }}
              _active={{ color: "blue.800" }}
              onClick={onCreateModalOpen}
            >
              新規作成はこちら
            </Text>

            <Modal isOpen={isCreateModalOpen} onClose={onCreateModalClose}>
              <ModalOverlay />
              <ModalContent mx={6}>
                <ModalHeader textAlign={"center"} color={"black"}>
                  アカウント新規作成
                </ModalHeader>
                <ModalCloseButton color={"black"} />
                <ModalBody pb={2}>
                  <FormControl>
                    <Input
                      color={"black"}
                      id="email"
                      type="email"
                      value={createEmail}
                      onChange={(event) => setCreateEmail(event.target.value)}
                      placeholder="メールアドレス"
                    />

                    <Input
                      mt={6}
                      color={"black"}
                      id="password"
                      type="password"
                      value={createPassword}
                      onChange={(event) =>
                        setCreatePassword(event.target.value)
                      }
                      placeholder="パスワード"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    onClick={handleSignUp}
                    bg="black"
                    color={"white"}
                    mr={3}
                  >
                    作成
                  </Button>

                </ModalFooter>
              </ModalContent>
            </Modal>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              {/* <MailInput /> */}
              <FormControl>
                <Input
                  color={"black"}
                  placeholder={"メールアドレス"}
                  id="mail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  mt={4}
                  color={"black"}
                  placeholder={"パスワード"}
                  id="pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Text
                      _hover={{ cursor: "pointer", color: "blue.600" }}
                      color={"blue.400"}
                      _focus={{ boxShadow: "outline" }}
                      _active={{ color: "blue.800" }}
                      onClick={onResetModalOpen}
                    >
                      パスワードをお忘れですか？
                    </Text>
                    <Modal
                      isOpen={isResetModalOpen}
                      onClose={onResetModalClose}
                    >
                      <ModalOverlay />
                      <ModalContent
                        mx={6}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <ModalHeader textAlign={"center"} color={"black"}>
                          リセットURLの送信先
                        </ModalHeader>
                        <ModalCloseButton color={"black"} />
                        <ModalBody pb={6}>
                          <FormControl>
                            <FormLabel color={"black"}>
                              メールアドレス
                            </FormLabel>
                            <Input
                              w={"300px"}
                              color={"black"}
                              id="email"
                              type="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="メールアドレス"
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            mr={3}
                            onClick={handleResetPassword}
                            bg="black"
                            color={"white"}
                          >
                            メール送信
                          </Button>

                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Stack>
                  <Button
                    onClick={handleLogin}
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: "blue.900",
                    }}
                  >
                    ログイン
                  </Button>
                  {error && (
                    <Box
                      bg="red.100"
                      color="red.500"
                      p="2"
                      rounded="md"
                      fontSize="sm"
                      textAlign={"center"}
                    >
                      サインインに失敗しました
                    </Box>
                  )}
                </>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
