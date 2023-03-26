export type FormInputs = {
  name: string;
  nickname: string;
  hobby: string;
  memo: string;
  address: string;
  language: string;
  nailThickness: string;
  floatingPart: string;
  oiliness: string;
  visits: number;
  nailPhotos: string[];
  facePhotos: string[];
};

export type UserInfo = FormInputs & {
  id: string;
}

