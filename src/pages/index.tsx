import {
  Flex,
  Box,
  Stack,
  Heading,
  useColorModeValue,
  Button,
  useDisclosure,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { auth } from "../../firebase";
import { useRecoilState } from "recoil";
import { emailState, errorState, passwordState } from "@/Recoil/atom";
import { signInWithEmailAndPassword } from "firebase/auth";

import LoginModal from "@/components/organisms/SignUpModal";
import ResetPasswordModal from "@/components/organisms/ResetPasswordModal";

// ログインページ
export default function Login() {
  const router = useRouter();
  // ログイン情報
  const [email, setEmail] = useRecoilState<string>(emailState);
  const [password, setPassword] = useRecoilState<string>(passwordState);

  const [error, setError] = useRecoilState(errorState);
  // モーダルが２つある為それぞれ名付け
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

  // メールアドレスとパスワードでログイン
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("正しいメールアドレスを入力してください。");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      router.push("/home");
    } catch (error: unknown) {
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
            {/* サインアップ */}
            <Text
              _hover={{ cursor: "pointer", color: "blue.600" }}
              color={"blue.300"}
              _focus={{ boxShadow: "outline" }}
              _active={{ color: "blue.800" }}
              onClick={onCreateModalOpen}
            >
              新規作成はこちら
            </Text>
            {/* サインアップモーダル */}
            <LoginModal
              isOpen={isCreateModalOpen}
              onClose={onCreateModalClose}
            />
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>

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
                    {/* パスワードリセットモーダル */}
                    <ResetPasswordModal
                      isOpen={isResetModalOpen}
                      onClose={onResetModalClose}
                    />
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
