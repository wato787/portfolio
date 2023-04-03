import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../components/templates/Header";
import Footer from "@/components/templates/Footer";
import listPlugin from '@fullcalendar/list';
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
  Spinner,
  Flex,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  getDocs,

} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

const MyCalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [events, setEvents] = useState<EventInput[]>([]);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [view, setView] = useState("dayGridMonth");
  // 候補リストを管理するstate
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 予測変換
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEventTitle(value);

    // Firestoreから候補を検索してstateに保存する
    const fetchData = async () => {
      const q = query(
        collection(db, "users", user!.uid, "info"),
        where("name", ">=", value),
        where("name", "<=", value + "\uf8ff")
      );
      const querySnapshot = await getDocs(q);
      const data: string[] = querySnapshot.docs.map((doc) => doc.data().name);
      setSuggestions(data);
    };
    fetchData();
  };

  const handleAddEvent = async () => {
    if (eventTitle === "") return;
    if (calendarRef.current) {
      const event: EventInput = {
        title: eventTitle,
        start: new Date(`${eventDate}T${eventTime}:00`),
      };
      try {
        // Firestoreにドキュメントを追加
        await addDoc(collection(db, "users", user!.uid, "events"), {
          ...event,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        console.error(error);
      }
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent(event);
    }
    setEventTitle("");
    setEventTime("");
    onClose();
  };

  const handleDateClick = (arg: DateClickArg) => {
    setEventDate(arg.dateStr); // クリックした日付を設定する
    onOpen();
  };

  const handleEventClick = (arg: EventClickArg) => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      const date = arg.event.start;
      calendarApi.gotoDate(date!);
      calendarApi.changeView("dayGridDay");
    }
  };


  useEffect(() => {
    if (router.query.view === "listWeek") {
      setView("listWeek");
    }
  }, [router.query.view]);


  useEffect(() => {
    if (!user) return;

    const unsubscribe = onSnapshot(
      collection(db, "users", user!.uid, "events"),
      (snapshot) => {
        const data: { start: Date; id: string }[] = snapshot.docs.map((doc) => {
          const docData = doc.data();
          // data.startをDate型に変換
          const start = new Date(
            docData.start.seconds * 1000 + docData.start.nanoseconds / 1000000
          );
          return {
            id: doc.id,
            ...docData,
            start,
          };
        });

        console.log(data);
        setEvents(data);
      }
    );

    return unsubscribe;
  }, [user]);

  return (
    <>
      {user ? (
        <>
          <Header />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>予定追加</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    type="text"
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
                  <Input
                    type="time"
                    placeholder="時間"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddEvent}>
                  追加
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Box fontSize={12} mt={4} pb={{ base: "72px" }}>
            <FullCalendar
              height="500px"
              ref={calendarRef}
              headerToolbar={{
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,dayGridDay",
              }}
              buttonText={{
                month: "月",
                day: "日",

              }}
              businessHours={true} //休日色付け
              editable={true} // イベント操作の可否
              navLinks={true}
              dateClick={handleDateClick} //日付ごとのクリックイベント（予定追加）
              eventClick={handleEventClick}
              dayCellContent={(e) =>
                (e.dayNumberText = e.dayNumberText.replace("日", ""))
              }
              locale="ja"
              plugins={[dayGridPlugin, interactionPlugin,listPlugin]}
              initialView={view}
              events={events}
             
              
            />
          </Box>
          <Footer />
        </>
      ) : (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </>
  );
};

export default MyCalendar;
