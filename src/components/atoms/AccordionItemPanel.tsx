import { EditIcon } from "@chakra-ui/icons";
import {
  AccordionPanel,
  Button,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { auth, db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ChangeEvent, useState } from "react";

interface Item {
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
}: Item) => {
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
    const updateData: { [key: string]: string | number } = {};
    if (fieldName === "visits") {
      updateData[fieldName] = Number(newValue);
    } else {
      updateData[fieldName] = newValue;
    }
    await updateDoc(infoDocRef, updateData);
    setText(newValue);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewValue(value);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewValue(event.target.value);
  };

  return (
    <AccordionPanel pb={2}>
      <Flex justifyContent="space-between" alignItems="center">
        {isEditing ? (
          <>
            <Input type="text" value={newValue} onChange={handleInputChange} />
            <Button onClick={handleSaveClick}>保存</Button>
            <Button onClick={handleCancelClick}>キャンセル</Button>
          </>
        ) : (
          <>
            <Text>
              {beforeValue}
              {text}
            </Text>
            <IconButton
              onClick={handleEditClick}
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
