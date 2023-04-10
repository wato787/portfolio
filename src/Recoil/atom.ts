import { TodayUserInfo } from "@/types/type";
import { atom } from "recoil";
// ログイン
export const emailState = atom<string>({
  key: "emailState",
  default: "",
});

export const passwordState = atom<string>({
  key: "passwordState",
  default: "",
});
// サインアップ
export const createEmailState = atom<string>({
  key: "createEmailState",
  default: "",
});

export const createPasswordState = atom<string>({
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

export const eventDateState = atom<string>({
  key: "eventDateState",
  default: "",
});


export const eventTitleState = atom<string>({
  key: "eventTitleState",
  default: "",
});

export const eventTimeState = atom<string>({
  key: "eventTimeState",
  default: "",
});

export const errorState = atom<unknown>({
  key: "errorState",
  default: "",
});






