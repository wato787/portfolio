import { FormControl, FormLabel, Input } from '@chakra-ui/react';
const PasswordInput = () => {
    return (
         <FormControl id="password">
                <FormLabel>パスワード</FormLabel>
                <Input type="password" />
              </FormControl>
    );
}

export default PasswordInput 