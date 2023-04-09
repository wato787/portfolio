import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { matchedDataState } from "../Recoil/atom";
import { useFetchTodayEvents } from "../hooks/useFetchToadyEvents";
import { UserInfo, TodayUserInfo } from "../types/type";
import { format } from "date-fns";
import { useListData } from "./useListData";

export const useTodayUserData = (): TodayUserInfo[] => {
  const listData: UserInfo[] = useListData();
  const [todayList, setTodayList] = useRecoilState(matchedDataState);
  // 今日のイベントを取得
  const todayEvents = useFetchTodayEvents();
  // 昇順に並び替え
  useEffect(() => {
    const matched = listData.filter((data) =>
      todayEvents.some(
        (event) =>
          event.title === data.name &&
          (!event.visited || event.visited !== true)
      )
    );
    const todayUserData = matched.map((data: UserInfo) => {
      const todayEventData = todayEvents.find(
        (event) =>
          event.title === data.name &&
          (!event.visited || event.visited !== true)
      );
      const startTime = format(
        new Date(todayEventData!.start.seconds * 1000),
        "HH:mm"
      );
      return {
        ...data,
        start: startTime,
        eventId: todayEventData!.id,
      };
    });

    todayUserData.sort((a, b) => {
      if (a.start < b.start) {
        return -1;
      }
      if (a.start > b.start) {
        return 1;
      }
      return 0;
    });
    setTodayList(todayUserData);
  }, [listData, todayEvents, setTodayList]);

  return todayList;
};
