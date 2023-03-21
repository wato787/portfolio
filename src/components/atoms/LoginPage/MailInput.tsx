import { emailState } from "@/Recoil/atom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";

const MailInput = () => {
    const setEmail = useSetRecoilState(emailState)
    return (
        <FormControl id="email">
                <FormLabel>メールアドレス</FormLabel>
                <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
    );
}

export default MailInput;