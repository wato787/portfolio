import { useRecoilState, useSetRecoilState } from 'recoil';
import { emailState, errorState } from '../../Recoil/atom';
import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormLabel,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ResetPasswordModal = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useRecoilState<string>(emailState);

  const setError = useSetRecoilState(errorState);

  const handleResetPassword = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("正しいメールアドレスを入力してください。");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("パスワードリセットのメールを送信しました。");
      onClose();
    } catch (error: unknown) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent mx={6} alignItems="center" justifyContent="center">
        <ModalHeader textAlign={"center"} color={"black"}>
          リセットURLの送信先
        </ModalHeader>
        <ModalCloseButton color={"black"} />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel color={"black"}>メールアドレス</FormLabel>
            <Input
              w={"300px"}
              color={"black"}
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="メールアドレス"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={handleResetPassword}
            bg="black"
            color={"white"}
          >
            メール送信
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
