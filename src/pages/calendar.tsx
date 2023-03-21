import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../components/templates/Header";
import Footer from "@/components/templates/Footer";
import { Box } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import { v4 as uuidv4 } from "uuid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { useRef } from "react";
import { EventInput } from "@fullcalendar/core";

const MyCalendar = () => {
  const calendarRef = useRef<FullCalendar | null>(null);

  const handleDateClick = (arg: DateClickArg) => {
    const eventName = prompt("イベントを入力してください");
    if (eventName && calendarRef.current) {
      const event: EventInput = {
        id: uuidv4(),
        title: eventName,
        start: arg.date,
        allDay: arg.allDay,
      };
      const calendarApi = calendarRef.current.getApi();
      calendarApi.addEvent(event);
    }
  };
  return (
    <>
      <Header />
     
      <Box m={4} pb={{base:"72px"}}>
        <FullCalendar
        height="500px"
          ref={calendarRef}
          headerToolbar={{ left: "prev", center: "title", right: "next" }}
          businessHours={true}//休日色付け
          editable={true} // イベント操作の可否
          dateClick={handleDateClick}//日付ごとのクリックイベント（予定追加）
          // eventClick={予定をクリックしたときのイベント（編集）}
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
