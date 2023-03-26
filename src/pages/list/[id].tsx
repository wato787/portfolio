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
import AccordionItemPanel from "@/components/atoms/AccordionItemPanel";
import useUserInfo from "@/hooks/useUserInfo";

const Detail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormInputs>();
  const router = useRouter();
  const currentUrl = router.asPath;
  const url = currentUrl.replace(/^\/list\//, "");

  // firestoreからデータ取得
const info =useUserInfo(url);

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  const initialRef = useRef(null);

  // info.nailPhotosを変数に入れてmapで展開
  const nailPhotoList = info?.nailPhotos;

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
              <AccordionItemPanel value={`名前:${info.name}`} />
              <AccordionItemPanel value={`ニックネーム:${info.nickname}`} />
              <AccordionItemPanel value={`趣味:${info.hobby}`} />
              <AccordionItemPanel value={`メモ:${info.memo}`} />
              <AccordionItemPanel value={`話し方:${info.language}`} />
              <AccordionItemPanel value={`爪の厚さ:${info.nailThickness}`} />
              <AccordionItemPanel
                value={`浮きやすい部分:${info.floatingPart}`}
              />
              <AccordionItemPanel value={`油分:${info.oiliness}`} />
              <AccordionItemPanel value={`来店回数:${info.visits}`} />
              <AccordionItemPanel value={`住所:${info.address}`} />
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
                    <Input type="file" accept="image/*" />
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
            {nailPhotoList?.map((src, i) => (
              <>
                <Image
                  key={i}
                  src={src}
                  alt="image"
                  width="120px"
                  height="120px"
                />
              </>
            ))}
          </Flex>

          <Footer />
        </>
      )}
    </>
  );
};

export default Detail;
