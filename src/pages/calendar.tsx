import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../components/templates/Header";
import Footer from "@/components/templates/Footer";
import listPlugin from "@fullcalendar/list";
import { Box, useDisclosure, Spinner, Flex } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useEffect, useRef, useState } from "react";
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { auth, db } from "../../firebase";
import { addDoc, collection, doc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import AddEventModal from "@/components/templates/AddEventModal";
import {  useRecoilState } from 'recoil';
import { eventDateState, eventTimeState, eventTitleState } from "@/Recoil/atom";

const MyCalendar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const calendarRef = useRef<FullCalendar | null>(null);
  const [eventDate,setEventDate] = useRecoilState(eventDateState);
  const [events, setEvents] = useState<EventInput[]>([]);
  const [eventTitle, setEventTitle] = useRecoilState(eventTitleState);
  const [eventTime, setEventTime] = useRecoilState(eventTimeState);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [view, setView] = useState("dayGridMonth");

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

  // 予定追加
  const handleAddEvent = async () => {
    if (eventTitle === "") return;
    if (calendarRef.current) {
      const event: EventInput = {
        title: eventTitle,
        start: new Date(`${eventDate}T${eventTime}:00`),
      };
      try {
        // Firestoreにドキュメントを追加
        const docRef = await addDoc(
          collection(db, "users", user!.uid, "events"),
          {
            ...event,
            createdAt: serverTimestamp(),
            visited: false,
          }
        );
        await updateDoc(doc(docRef.parent, docRef.id), { id: docRef.id });

        // カレンダーにイベントが追加されていない場合にのみ追加する
        const calendarApi = calendarRef.current.getApi();
        if (!calendarApi.getEventById(docRef.id)) {
          calendarApi.addEvent({
            ...event,
            id: docRef.id,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    setEventTitle("");
    setEventTime("");
    onClose();
  };

  // urlで表示変更
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
          {/* 予定追加モーダル */}
          <AddEventModal isOpen={isOpen} onClose={onClose} handleAddEvent={handleAddEvent}/>

          <Box fontSize={12} mt={20} mx={2} pb={{ base: "72px" }}>
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
              plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
              initialView={view}
              events={events}
            />
          </Box>
          <Footer />
        </>
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
};

export default MyCalendar;
