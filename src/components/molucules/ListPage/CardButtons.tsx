import { Stack } from '@chakra-ui/react';
import CardDetailButton from '@/components/atoms/ListPage/CardDetailButton';
import CardDoneButton from '@/components/atoms/ListPage/CardDoneButton';
const CardButtons = () => {
    return (
        <Stack
            width={"100%"}
            mt={"2rem"}
            direction={"column"}
            padding={2}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <CardDetailButton />
            <CardDoneButton />
          </Stack>
    );
}

export default CardButtons;