import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import EditIconButton from "../../components/atoms/EditIconButton";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  Box,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, UserInfo } from "../../types/AddInfoPage/type";
import {
  getDocs,
  collection,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const Detail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormInputs>();
  const [user, loading, error] = useAuthState(auth);
  const [info, setInfo] = useState<UserInfo>();
  const router = useRouter();
  const currentUrl = router.asPath;
  const url = currentUrl.replace(/^\/list\//, "");

  useEffect(() => {
    if (!user) return;

    const getInfo = async () => {
      const q = query(
        collection(db, `users/${user.uid}/info`),
        where("id", "==", url)
      );
      const infoSnapshot = await getDocs(q);
      const infoData = infoSnapshot.docs[0].data() as UserInfo;
      setInfo(infoData);
    };
    getInfo();
  }, [user, url]);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  const initialRef = useRef(null);
  console.log(info);
  const nailPhotoList =info?.nailPhotos
  console.log(nailPhotoList);

  return (
    <>
      {info && (
        <>
          <Header />
          {/* お客様情報 */}
          <Accordion allowMultiple mb={4} m={2}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    お客様情報
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>名前：{info.name}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>ニックネーム：{info.nickname}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>趣味：{info.hobby}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>メモ：{info.memo}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>話し方：{info.language}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>爪の厚さ：{info.nailThickness}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>浮きやすい部分：{info.floatingPart}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>油分：{info.oiliness}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>来店回数：{info.visits}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
              <AccordionPanel pb={2}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>住所：{info.address}</Text>
                  <EditIconButton />
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          {/* 写真追加 */}
          <Flex align={"center"} justify={"center"} pb={6}>
            <Button rightIcon={<MdOutlineAddPhotoAlternate />} onClick={onOpen}>
              写真追加
            </Button>

            <Modal
              initialFocusRef={initialRef}
              isOpen={isOpen}
              onClose={onClose}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>写真追加</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                    />
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={handleSubmit(onSubmit)}
                  >
                    追加
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>

          {/* ネイル履歴写真リスト */}

          <p>
            写真３０枚でページ分割かもっと見るクリックで全写真表示ページ。写真クリックで拡大、出来ればスワイプで写真切り替え最低限矢印ボタンはつける
          </p>
          <Flex
            align={"center"}
            justify={"center"}
            wrap={"wrap"}
            gap={1}
            pb={"80px"}
          >
            <Image
              src="https://source.unsplash.com/random"
              alt="image"
              width="120px"
              height="120px"
            />
            <Image
              src="https://source.unsplash.com/random"
              alt="image"
              width="120px"
              height="120px"
            />
          </Flex>

          <Footer />
        </>
      )}
    </>
  );
};

export default Detail;
