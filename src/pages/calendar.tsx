import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Header from "../components/templates/Header";
import Footer from "@/components/templates/Footer";
import { Box } from "@chakra-ui/react";
import FullCalendar from '@fullcalendar/react';

import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"
import { useRef } from "react";
import { EventInput } from "@fullcalendar/core";

const MyCalendar = () => {
    const calendarRef = useRef<FullCalendar | null>(null);

    const handleDateClick = (arg: DateClickArg) => {
      const eventName = prompt("イベントを入力してください");
      if (eventName && calendarRef.current) {
        const event: EventInput = {
          title: eventName,
          start: arg.date,
          allDay: arg.allDay
        };
        const calendarApi = calendarRef.current.getApi();
        calendarApi.addEvent(event);
      }
    };
  return (
    <>
      <Header />
      <Box m={4}>
        <FullCalendar
        ref={calendarRef}
        headerToolbar={{left:'prev',center:'title',right:'next'}}
        businessHours={true}
        weekends={true}
        dateClick={handleDateClick}
        dayCellContent={(e)=>e.dayNumberText = e.dayNumberText.replace('日','')}
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
