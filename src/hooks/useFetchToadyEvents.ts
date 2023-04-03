import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { TodayEventData } from "../types/type";
import { startOfDay, endOfDay } from "date-fns";

export const useFetchTodayEvents = () => {
  const [todayEvents, setTodayEvents] = useState<TodayEventData[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTodayEvents = async () => {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());

      const eventsRef = collection(db, "users", user!.uid, "events");
      const todayEventsQuery = query(
        eventsRef,
        where("start", ">=", todayStart),
        where("start", "<=", todayEnd)
      );

      const todayEventsSnapshot = await getDocs(todayEventsQuery);
      const todayEventsData = todayEventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TodayEventData[];

      setTodayEvents(todayEventsData);
    };

    if (user) {
      fetchTodayEvents();
    }
  }, [user]);

  return todayEvents;
};
