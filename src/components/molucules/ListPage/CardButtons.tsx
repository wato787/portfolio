import { Stack, Button } from '@chakra-ui/react';
import CardDetailButton from '@/components/atoms/ListPage/CardDetailButton';
import CardDoneButton from '@/components/atoms/ListPage/CardDoneButton';
import { useRouter } from 'next/router';
const CardButtons = () => {
  const router = useRouter();

    return (
        <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"column"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
 <Button
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
            <Button
        px={6}

        fontSize={"sm"}
        rounded={"full"}
        bg={"blue.400"}
        color={"white"}
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        _hover={{
          bg: "blue.500",
        }}
        _focus={{
          bg: "blue.500",
        }}
      >
        来店済み
      </Button>
          </Stack>
    );
}

export default CardButtons;