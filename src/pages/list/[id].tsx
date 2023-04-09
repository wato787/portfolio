import React, { useEffect, useState } from "react";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import {
  Button,
  useDisclosure,
  Box,
  Flex,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

import { useRouter } from "next/router";
import useUserInfo from "@/hooks/useUserInfo";
import { UserInfo } from "@/types/type";
import InfoAccordion from "../../components/organisms/InfoAccordion";
import Image from "next/image";
import AddPhotoModal from "@/components/templates/AddPhotoModal";
import { useRecoilState } from "recoil";
import { nailPhotoListState } from "@/Recoil/atom";
const Detail = () => {
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>("");
  const [nailPhotoList, setNailPhotoList] = useRecoilState(nailPhotoListState);
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

  // firestoreからデータ取得
  const info: UserInfo | undefined = useUserInfo(url);

  //  変更を監視
  useEffect(() => {
    if (info && info.nailPhotos) {
      setNailPhotoList(info.nailPhotos);
    } else {
      setNailPhotoList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, info?.nailPhotos]);

  // 表示するデータを格納
  const displayData = nailPhotoList.slice(0, displayCount);

  return (
    <>
      {info ? (
        <>
          <Header />
          {/* お客様情報 */}
          <InfoAccordion info={info} />

          {/* 写真追加 */}
          <Flex align={"center"} justify={"center"} pb={6}>
            <IconButton
              color={"blue.800"}
              borderRadius={"50%"}
              zIndex={999}
              position={"fixed"}
              bottom={"88px"}
              right={10}
              aria-label="add"
              icon={<MdOutlineAddPhotoAlternate size={22} />}
              bg={"white"}
              onClick={onOpen}
              variant="outline"
              colorScheme="blackAlpha"
              size="lg"
            />
            <AddPhotoModal isOpen={isOpen} onClose={onClose} id={info.id}/>
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
          {/* 拡大表示 */}
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
              zIndex={"999"}
            >
              <Image
                src={selectedImage as string}
                alt="selected image"
                width={320}
                height={300}
                layout="responsive"
              />
            </Box>
          )}
          <Footer />
        </>
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
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
