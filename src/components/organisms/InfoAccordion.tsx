import { UserInfo } from "@/types/type";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import AccordionItemPanel from "../atoms/AccordionItemPanel";
import { Button } from "@chakra-ui/react";
import { useRef } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useRouter } from "next/router";

const InfoAccordion = ({ info }: { info: UserInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const user = auth.currentUser;
    // 削除
    const infoDocRef = doc(db, "users", user!.uid, "info", info.id);
    if (id === info.id) {
      await deleteDoc(infoDocRef);
      router.push("/list");
    }
  };

  return (
    <>
      <Accordion allowMultiple mb={4} mx={2} mt={20}>
        <AccordionItem>
          <Heading as={"h2"}>
            <AccordionButton _expanded={{ bg: "gray.600" }}>
              <Box as="span" flex="1" textAlign="left">
                お客様情報
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionItemPanel
            beforeValue={"名前:"}
            value={info.name}
            infoId={info.id}
            fieldName="name"
          />
          <AccordionItemPanel
            beforeValue={"ニックネーム:"}
            value={info.nickname}
            infoId={info.id}
            fieldName="nickname"
          />
          <AccordionItemPanel
            beforeValue={"趣味:"}
            value={info.hobby}
            infoId={info.id}
            fieldName="hobby"
          />
          <AccordionItemPanel
            beforeValue={"メモ:"}
            value={info.memo}
            infoId={info.id}
            fieldName="memo"
          />
          <AccordionItemPanel
            beforeValue={"話し方:"}
            value={info.language}
            infoId={info.id}
            fieldName="language"
          />
          <AccordionItemPanel
            beforeValue={"爪の厚さ:"}
            value={info.nailThickness}
            infoId={info.id}
            fieldName="nailThickness"
          />
          <AccordionItemPanel
            beforeValue={"浮きやすい部分:"}
            value={info.floatingPart}
            infoId={info.id}
            fieldName="floatingPart"
          />
          <AccordionItemPanel
            beforeValue={"油分:"}
            value={info.oiliness}
            infoId={info.id}
            fieldName="oiliness"
          />
          <AccordionItemPanel
            beforeValue={"来店回数:"}
            value={info.visits}
            infoId={info.id}
            fieldName="visits"
          />
          <AccordionItemPanel
            beforeValue={"住所:"}
            value={info.address}
            infoId={info.id}
            fieldName="address"
          />
          <AccordionPanel textAlign={"center"}>
            <Button size={"sm"} colorScheme={"red"} onClick={onOpen}>
              顧客リストから削除
            </Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {/*  */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent mx={6} textAlign={"center"}>
            <AlertDialogHeader color={"black"} fontSize="lg" fontWeight="bold">
              削除
            </AlertDialogHeader>

            <AlertDialogBody color={"black"}>
              リストから削除しますか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button bg={"#111111"} ref={cancelRef} onClick={onClose}>
                いいえ
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(info.id)}
                ml={3}
              >
                はい
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default InfoAccordion;
