import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../components/templates/Header";
import Footer from "@/components/templates/Footer";
import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import { v4 as uuidv4 } from "uuid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useRef, useState } from "react";
import { EventInput } from "@fullcalendar/core";

const MyCalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");

  const handleAddEvent = () => {
    if (calendarRef.current) {
      const event: EventInput = {
        id: uuidv4(),
        title: eventTitle,
        start: eventTime,
      };
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent(event);
    }
    setEventTitle("");
    setEventTime("");
    onClose();
  };

  return (
    <>
      <Header />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>予定追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input type="text" placeholder="タイトル" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} />
            </FormControl>
            <FormControl mt={4}>
              <Input type="dateTime-local" placeholder="時間" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
              追加
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box m={4} pb={{ base: "72px" }}>
        <FullCalendar
          height="500px"
          ref={calendarRef}
          headerToolbar={{ left: "prev", center: "title", right: "next" }}
          businessHours={true} //休日色付け
          editable={true} // イベント操作の可否
          navLinks={true}
          dateClick={onOpen} //日付ごとのクリックイベント（予定追加）
          // eventClick={}
          dayCellContent={(e) =>
            (e.dayNumberText = e.dayNumberText.replace("日", ""))
          }
          locale="ja"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
        />
      </Box>
      <Footer />
    </>
  );
};

export default MyCalendar;
