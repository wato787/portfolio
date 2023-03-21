import CardBadge from "@/components/atoms/ListPage/CardBadge";
import { Stack } from "@chakra-ui/react";

const CardBadges = () => {
    return (
        <Stack  align={"center"} justify={"center"} direction={"row"} mt={6}>
      <CardBadge text="爪の厚さ"/>
      <CardBadge text="浮きやすい部分"/>
      <CardBadge text="油分"/>
      </Stack>
    );
}

export default CardBadges;