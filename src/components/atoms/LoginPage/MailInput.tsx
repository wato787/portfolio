import { FormControl, FormLabel, Input } from "@chakra-ui/react";

const MailInput = () => {
    return (
        <FormControl id="email">
                <FormLabel>メールアドレス</FormLabel>
                <Input type="email" />
              </FormControl>
    );
}

export default MailInput;