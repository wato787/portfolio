import { emailState } from "@/Recoil/atom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";

const MailInput = () => {
    const [email,setEmail] = useRecoilState(emailState)
    return (
        <FormControl id="email">
                <FormLabel>メールアドレス</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
    );
}

export default MailInput;