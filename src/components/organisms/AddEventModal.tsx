import { auth, db } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { ChangeEvent, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  Text,
  Box,
  Button,
  FormLabel,
  ModalFooter,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { eventDateState, eventTimeState, eventTitleState } from "@/Recoil/atom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  handleAddEvent:()=>void;
}

const AddEventModal = ({ isOpen, onClose,handleAddEvent }: Props) => {
  const eventDate = useRecoilValue(eventDateState);
  // 候補リストを管理するstate
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [eventTitle, setEventTitle] = useRecoilState(eventTitleState);
  const [eventTime, setEventTime] = useRecoilState(eventTimeState);
  const [user] = useAuthState(auth);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEventTitle(value);
    // Firestoreから候補を検索してstateに保存する
    const fetchData = async () => {
      if (value !== "") {
        // 入力値が空文字列でない場合にのみクエリを実行する
        const q = query(
          collection(db, "users", user!.uid, "info"),
          where("name", ">=", value),
          where("name", "<=", value + "\uf8ff")
        );
        const querySnapshot = await getDocs(q);
        const data: string[] = querySnapshot.docs.map((doc) => doc.data().name);
        setSuggestions(data);
      } else {
        setSuggestions([]); // 入力値が空文字列の場合には空の配列をセットする
      }
    };
    fetchData();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader color={"black"}>
            {new Date(eventDate).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </ModalHeader>

          <ModalCloseButton color={"black"} />
          <ModalBody pb={6}>
            <FormControl>
              <Text mb={1} fontSize={"sm"} color={"black"}>
                ※顧客リストと同じ名前を入力してください
              </Text>
              <Input
                autoFocus
                type="text"
                color={"black"}
                placeholder="名前"
                value={eventTitle}
                onChange={handleTitleChange}
              />
            </FormControl>

            {/* 候補リスト */}
            <Box mt={2}>
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  size="sm"
                  bg={"black"}
                  color={"white"}
                  m={2}
                  onClick={() => {
                    setEventTitle(suggestion);
                    setSuggestions([]);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </Box>

            <FormControl mt={4}>
              <FormLabel fontWeight={600} color={"black"}>
                来店時間
              </FormLabel>
              <Input
                color={"black"}
                type="time"
                value={eventTime}
                onChange={(e) => setEventTime(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bg={"black"} color="white" mr={3} onClick={handleAddEvent}>
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddEventModal;
