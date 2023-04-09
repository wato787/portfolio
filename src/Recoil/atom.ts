import { TodayUserInfo } from "@/types/type";
import { atom } from "recoil";
// ログイン
export const emailState = atom({
  key: "emailState",
  default: "",
});

export const passwordState = atom({
  key: "passwordState",
  default: "",
});
// サインアップ
export const createEmailState = atom({
  key: "createEmailState",
  default: "",
});

export const createPasswordState = atom({
  key: "createPasswordState",
  default: "",
});

export const matchedDataState = atom<TodayUserInfo[]>({
  key: "matchedDataState",
  default: [],
});

export const nailPhotoListState = atom<string[]>({
  key: "nailPhotoListState",
  default: [],
});

export const isLoadingState = atom<boolean>({
  key: "isLoadingState",
  default: false,
});

export const eventDateState = atom({
  key: "eventDateState",
  default: "",
});


export const eventTitleState = atom({
  key: "eventTitleState",
  default: "",
});

export const eventTimeState = atom({
  key: "eventTimeState",
  default: "",
});






