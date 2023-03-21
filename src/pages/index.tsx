import Head from "next/head";

import { Flex, Box, Stack, Heading, useColorModeValue, Button } from '@chakra-ui/react';
import MailInput from "@/components/atoms/LoginPage/MailInput";
import PasswordInput from "../components/atoms/LoginPage/PasswordInput";
import RemFor from "@/components/molucules/LoginPage/RemFor";
import { useRouter } from "next/router";
import { useState } from "react";
import {auth}from "../../firebase"
import { useRecoilState, useRecoilValue } from "recoil";
import { emailState, passwordState } from "@/Recoil/atom";
import { signInWithEmailAndPassword } from "firebase/auth";

// ログインページ
export default function Login() {
  const router = useRouter();
  const email = useRecoilValue(emailState);
  const password = useRecoilValue(passwordState);
  const [error, setError] = useState<string>("");

  // メールアドレスとパスワードでログイン
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth,email, password);
      router.push("/home"); // ログイン後のリダイレクト先を設定
    } catch (error:any) {
      setError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Ohung</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
        pb={{ base: "72px" }}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>サインイン</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <MailInput  />
              <PasswordInput  />
              <RemFor />
              {error && (
                <Box
                  bg="red.100"
                  color="red.500"
                  p="4"
                  rounded="md"
                  fontSize="sm"
                >
                  {error}
                </Box>
              )}
              <Button onClick={handleLogin}>ログイン</Button>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}