import { Button } from '@chakra-ui/react';
const CardDetailButton = () => {
    return (
        <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              詳細
            </Button>
    );
}

export default CardDetailButton;