import { UserInfo } from "@/types/type";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
  Heading,
} from "@chakra-ui/react";
import AccordionItemPanel from "../atoms/AccordionItemPanel";

const InfoAccordion = ({ info }: { info: UserInfo }) => {
    
  return (
    <Accordion  allowMultiple mb={4} mx={2} mt={20}>
      <AccordionItem>
        <Heading as={"h2"}>
          <AccordionButton _expanded={{bg:"gray.600"}}>
            <Box as="span" flex="1" textAlign="left">
              お客様情報
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Heading>
        <AccordionItemPanel beforeValue={"名前:"} value={info.name} infoId={info.id} fieldName="name"/>
        <AccordionItemPanel beforeValue={"ニックネーム:"} value={info.nickname} infoId={info.id} fieldName="nickname"/>
        <AccordionItemPanel beforeValue={"趣味:"} value={info.hobby} infoId={info.id} fieldName="hobby"/>
        <AccordionItemPanel beforeValue={"メモ:"} value={info.memo} infoId={info.id} fieldName="memo"/>
        <AccordionItemPanel beforeValue={"話し方:"} value={info.language} infoId={info.id} fieldName="language"/>
        <AccordionItemPanel beforeValue={"爪の厚さ:"} value={info.nailThickness} infoId={info.id} fieldName="nailThickness"/>
        <AccordionItemPanel beforeValue={"浮きやすい部分:"} value={info.floatingPart} infoId={info.id} fieldName="floatingPart"/>
        <AccordionItemPanel beforeValue={"油分:"} value={info.oiliness} infoId={info.id} fieldName="oiliness"/>
        <AccordionItemPanel beforeValue={"来店回数:"} value={info.visits} infoId={info.id} fieldName="visits"/>
        <AccordionItemPanel beforeValue={"住所:"} value={info.address} infoId={info.id} fieldName="address"/>
      </AccordionItem>
    </Accordion>
  );
};

export default InfoAccordion;
