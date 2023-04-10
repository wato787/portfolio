import {
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
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { createEmailState, createPasswordState, errorState } from '../../Recoil/atom';
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from 'next/router';

interface Props{
  isOpen:boolean;
  onClose:()=>void
}

const LoginModal = ({isOpen,onClose}:Props) => {
  const  setError = useSetRecoilState(errorState);
  const router = useRouter();

  // サインアップ情報
  const [createEmail, setCreateEmail] =
    useRecoilState<string>(createEmailState);
  const [createPassword, setCreatePassword] =
    useRecoilState<string>(createPasswordState);


  const handleSignUp = async () => {
    if (!createEmail || !createPassword) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(createEmail)) {
      setError("正しいメールアドレスを入力してください。");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, createEmail, createPassword);
      setCreateEmail("");
      setCreatePassword("");
      // ユーザをFirestoreに保存する
      const user = auth.currentUser;
      const usersRef = doc(db, "users", user!.uid);
      await setDoc(usersRef, {
        id: user!.uid,
        email: createEmail,
      });
      router.push("/home");
    } catch (error: unknown) {
      alert(error);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={6}>
        <ModalHeader textAlign={"center"} color={"black"}>
          アカウント新規作成
        </ModalHeader>
        <ModalCloseButton color={"black"} />
        <ModalBody pb={2}>
          <FormControl>
            <Input
              color={"black"}
              id="email"
              type="email"
              value={createEmail}
              onChange={(e) => setCreateEmail(e.target.value)}
              placeholder="メールアドレス"
            />

            <Input
              mt={6}
              color={"black"}
              id="password"
              type="password"
              value={createPassword}
              onChange={(event) => setCreatePassword(event.target.value)}
              placeholder="パスワード"
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button onClick={handleSignUp} bg="black" color={"white"} mr={3}>
            作成
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
