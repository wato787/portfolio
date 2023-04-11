import { emailState, errorState } from "@/Recoil/atom";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { passwordState } from '../../Recoil/atom';
import { browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../firebase";

const LoginButton = () => {
    const router = useRouter();
  const setError = useSetRecoilState(errorState);
  const [email, setEmail] = useRecoilState<string>(emailState);
  const [password, setPassword] = useRecoilState<string>(passwordState);


     // メールアドレスとパスワードでログイン
  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("正しいメールアドレスを入力してください。");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await setPersistence(auth, browserSessionPersistence);
      setEmail("");
      setPassword("");
      router.push("/home");
    } catch (error: unknown) {
      alert(error);
    }
  };
    return (
        <Button
                    onClick={handleLogin}
                    bg={"black"}
                    color={"white"}
                    _hover={{
                      bg: "blue.900",
                    }}
                  >
                    ログイン
                  </Button>
    );
}

export default LoginButton;