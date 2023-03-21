import { passwordState } from '@/Recoil/atom';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useSetRecoilState } from 'recoil';
const PasswordInput = () => {
  const setPassword = useSetRecoilState(passwordState)
    return (
         <FormControl id="password">
                <FormLabel>パスワード</FormLabel>
                <Input type="password" onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
    );
}

export default PasswordInput 