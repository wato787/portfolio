import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import EditIconButton from "../../components/atoms/EditIconButton";
import AddInfoButton from "@/components/atoms/ListPage/AddInfoButton";
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

const detail = () => {
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



      {/* ネイル履歴写真リスト */}
      <Flex align={"center"} justify={"center"} pb={6}>
        <AddInfoButton text={"写真追加"} />
        モーダルで追加画面を出す
      </Flex>
<p>写真３０枚でページ分割かもっと見るクリックで全写真表示ページ</p>
      <Flex align={"center"} justify={"center"} wrap={"wrap"} gap={2} pb={"80px"}>
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="100px"
          height="100px"
        />
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="100px"
          height="100px"
        />
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="100px"
          height="100px"
        />
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="100px"
          height="100px"
        />
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="100px"
          height="100px"
        />
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="100px"
          height="100px"
        />
        <Image
          src="https://source.unsplash.com/random"
          alt="image"
          width="100px"
          height="100px"
        />
      </Flex>

      <Footer />
    </>
  );
};

export default detail;
