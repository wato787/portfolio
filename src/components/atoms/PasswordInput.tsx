import { passwordState } from '@/Recoil/atom';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useSetRecoilState, useRecoilState } from 'recoil';
const PasswordInput = () => {
  const [password,setPassword] = useRecoilState(passwordState)
    return (
         <FormControl id="password">
                <FormLabel>パスワード</FormLabel>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>
    );
}

export default PasswordInput 