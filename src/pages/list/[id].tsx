import React from "react";
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
  FormLabel,
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
import { FormValues } from '../../types/AddInfoPage/type';

const Detail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit:SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const initialRef = useRef(null);

  return (
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
              <Text>名前：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>ニックネーム：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>趣味：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>メモ：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>話し方：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>爪の厚さ：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>浮きやすい部分：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>油分：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>来店回数：</Text>
              <EditIconButton />
            </Flex>
          </AccordionPanel>
          <AccordionPanel pb={2}>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>住所：</Text>
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

        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>写真追加</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  // ref={register}
                  {...register("nailPhoto")}
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
              {/* <Button onClick={onClose}>キャンセル</Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      {/* ネイル履歴写真リスト */}

      <p>写真３０枚でページ分割かもっと見るクリックで全写真表示ページ。写真クリックで拡大、出来ればスワイプで写真切り替え最低限矢印ボタンはつける</p>
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
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="120px"
          height="120px"
        />
      </Flex>

      <Footer />
    </>
  );
};

export default Detail;
