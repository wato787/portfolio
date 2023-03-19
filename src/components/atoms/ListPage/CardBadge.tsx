import { Badge, useColorModeValue } from "@chakra-ui/react";

const CardBadge = ({text}:{text:string}) => {
    return (
        <Badge
        px={2}
        py={1}
        bg={useColorModeValue("gray.50", "gray.800")}
        fontWeight={"400"}
      >
        {text}
      </Badge>
    );
}

export default CardBadge;