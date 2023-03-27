import { UserInfo } from "@/types/AddInfoPage/type";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
} from "@chakra-ui/react";
import AccordionItemPanel from "../atoms/AccordionItemPanel";

const InfoAccordion = ({ info }: { info: UserInfo }) => {
    
  return (
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
        <AccordionItemPanel beforeValue={"名前:"} value={info.name} infoId={info.id} fieldName="name"/>
        <AccordionItemPanel beforeValue={"ニックネーム:"} value={info.nickname} infoId={info.id} fieldName="nickname"/>
        <AccordionItemPanel beforeValue={"趣味:"} value={info.hobby} infoId={info.id} fieldName="hobby"/>
        <AccordionItemPanel beforeValue={"メモ:"} value={info.memo} infoId={info.id} fieldName="name"/>
        <AccordionItemPanel beforeValue={"話し方:"} value={info.language} infoId={info.id} fieldName="memo"/>
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
