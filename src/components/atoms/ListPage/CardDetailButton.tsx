import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
const CardDetailButton = () => {
  const router = useRouter();
    return (
        <Button
              // flex={1}
              px={8}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
              onClick={()=>router.push(`list/xxx`)}
            >
              詳細
            </Button>
    );
}

export default CardDetailButton;