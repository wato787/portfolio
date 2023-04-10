import { CheckIcon, EditIcon } from "@chakra-ui/icons";
import {
  AccordionPanel,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";

interface Props {
  value: string | number;
  infoId: string;
  beforeValue: string;
  fieldName: string;
}

const AccordionItemPanel = ({
  value,
  infoId,
  beforeValue,
  fieldName,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string | number>(value);
  const [text, setText] = useState(value);
  const user = auth.currentUser;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    const infoDocRef = doc(db, "users", user!.uid, "info", infoId);
    const updateData: Record<string, string | number> = {};
    if (fieldName === "visits") {
      updateData[fieldName] = Number(newValue);
    } else {
      updateData[fieldName] = newValue;
    }
    await updateDoc(infoDocRef, updateData);
    setText(newValue);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };

  return (
    <AccordionPanel>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontSize="md"
        pb={2}
      >
        {isEditing ? (
          <>
            <Input type="text" value={newValue} onChange={handleInputChange} />
            <IconButton
              ml={1}
              size={"sm"}
              bg="white"
              color="blue"
              aria-label="保存"
              icon={<CheckIcon />}
              onClick={handleSaveClick}
            />
          </>
        ) : (
          <>

              <Text fontSize={"sm"} whiteSpace={"nowrap"}> {beforeValue}</Text>
              <Text  pl={2} w={"240px"} whiteSpace={"pre-wrap"}>
                {text}
              </Text>

            <IconButton
              onClick={handleEditClick}
              bg="#111111"
              color={"white"}
              size={"sm"}
              aria-label="Edit"
              icon={<EditIcon />}
            />
          </>
        )}
      </Flex>
    </AccordionPanel>
  );
};

export default AccordionItemPanel;
