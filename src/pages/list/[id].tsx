import React, { ChangeEvent, useEffect, useState } from "react";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
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
  Box,
  Flex,
  Text,
  Spinner,
  IconButton,
  Center,
} from "@chakra-ui/react";
import styles from "../../styles/InputTypeFile.module.scss"
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { useRouter } from "next/router";
import useUserInfo from "@/hooks/useUserInfo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../../firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { UserInfo } from "@/types/type";
import InfoAccordion from "../../components/organisms/InfoAccordion";
import Image from "next/image";
import { AddIcon } from "@chakra-ui/icons";
import { BiAddToQueue } from "react-icons/bi";
const Detail = () => {
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [nailFiles, setNailFiles] = useState<File[]>([]);
  const [nailPhotoList, setNailPhotoList] = useState<string[]>([]);
  const [displayCount, setDisplayCount] = useState<number>(50);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const currentUrl = router.asPath;
  const url = currentUrl.replace(/^\/list\//, "");

  // 画像クリックで拡大
  const handleImageClick = (src: string) => {
    setSelectedImage(src);
    setIsImageOpen(true);
  };

  const handleClose = () => {
    setIsImageOpen(false);
    setSelectedImage(undefined);
  };
  // storageにいれる
  const handleNailFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setNailFiles([...nailFiles, ...newFiles]);
    }
  };

  // firestoreからデータ取得
  const info: UserInfo | undefined = useUserInfo(url);

  // ログインユーザ情報取得
  const user = auth.currentUser;

  //  nailphoto追加
  const AddNailPhotos = async (infoId: string) => {
    const nailPhotosRefs: string[] = [];

    for (const nailFile of nailFiles) {
      const storageRef = ref(
        storage,
        `${user?.uid}/nailphotos/${nailFile.name}`
      );
      await uploadBytes(storageRef, nailFile);
      const URL = await getDownloadURL(storageRef);
      nailPhotosRefs.push(URL);
    }

    const infoDocRef = doc(db, "users", user!.uid, "info", infoId);
    await updateDoc(infoDocRef, {
      nailPhotos: arrayUnion(...nailPhotosRefs),
    });

    const updatedDoc = await getDoc(infoDocRef);
    const updatedData = updatedDoc.data();
    const updatedNailPhotoList = updatedData?.nailPhotos ?? [];
    setNailPhotoList(updatedNailPhotoList);
    setNailFiles([]);
    onClose();
  };

  useEffect(() => {
    if (info && info.nailPhotos) {
      setNailPhotoList(info.nailPhotos);
    } else {
      setNailPhotoList([]);
    }
  }, [info, info?.nailPhotos]);

  // 表示するデータを格納
  const displayData = nailPhotoList.slice(0, displayCount);

  return (
    <>
      {info ? (
        <>
          <Header />
          {/* お客様情報 */}
          <InfoAccordion  info={info} />

          {/* 写真追加 */}
          <Flex  align={"center"} justify={"center"} pb={6}>
          
       <IconButton  color={"blue.800"}  borderRadius={"50%"} zIndex={999} position={"fixed"} bottom={"88px"} right={10} aria-label="add" icon={<MdOutlineAddPhotoAlternate size={22} />} bg={"white"}  onClick={onOpen} variant='outline' colorScheme="blackAlpha" size="lg"/>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader textAlign={"center"} color={"black"}>写真追加</ModalHeader>
                <ModalCloseButton color={"black"} />
                <ModalBody pb={2}>
                  <FormControl>

                    <Center>
            <label className={styles.add} htmlFor="addFaceFile"><BiAddToQueue  color="black" size={30}/>
                    <Input
                      type="file"
                      id="addFaceFile"
                      multiple
                      accept="image/*"
                      style={{display:"none"}}
                      onChange={handleNailFileChange}
                      />
                      </label>
                      </Center>
                    <Text color={"red.500"} pt={2}>※同時画像ファイルアップロード10個まで</Text>
                    {/* プレビュー表示 */}
                    {nailFiles.length > 0 && (
                      <Flex wrap={"wrap"}>
                        {nailFiles.map((file) => (
                          <Box key={file.name}>
                            <Box my={1}>
                              <Image
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                width={100}
                                height={100}
                                layout="intrinsic"
                              />
                            </Box>
                          </Box>
                        ))}
                      </Flex>
                    )}
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => AddNailPhotos(info.id)}
                  >
                    追加
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Flex>

          {/* ネイル履歴写真リスト */}
          <Box pb={"80px"}>
            <Flex align={"center"} justify={"center"} wrap={"wrap"} gap={1}>
              {displayData.map((src: string, i: number) => (
                <Box key={i} onClick={() => handleImageClick(src)}>
                  <Image
                    src={src}
                    alt="image"
                    width={120}
                    height={120}
                    layout="intrinsic"
                    loading="eager"
                  />
                </Box>
              ))}
            </Flex>
            {nailPhotoList.length > displayCount && (
              <Flex align="center" justify="center" mt={4}>
                <Button onClick={() => setDisplayCount(displayCount + 50)}>
                  もっと見る
                </Button>
              </Flex>
            )}
          </Box>

          {isImageOpen && (
            <Box
              position="fixed"
              top={0}
              bottom={0}
              left={0}
              right={0}
              bg="rgba(0,0,0,0.5)"
              onClick={handleClose}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                src={selectedImage as string}
                alt="selected image"
                width={300}
                height={250}
                layout="intrinsic"
              />
            </Box>
          )}
          <Footer />
        </>
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"} height= '100vh'>

        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.400"
          size="xl"
          />
          </Flex>
      )}
    </>
  );
};

export default Detail;
