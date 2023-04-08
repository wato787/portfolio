import { Button } from "@chakra-ui/react";

interface Props {
eventId: string;
handleVisitsClick: (eventId: string) => void;
}

export default function VisitedButton({ eventId, handleVisitsClick }: Props) {
    // インデント直せそうであればなおしちゃいましょう
return (
<Button
px={6}
fontSize={"sm"}
rounded={"full"}
bg={"black"}
border=".5px solid #fff"
color={"white"}
boxShadow={
"0px 1px 1px 0px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
}
_hover={{
bg: "white",
color: "black"
}}
_focus={{
bg: "white",
color: "black"
}}
onClick={() => handleVisitsClick(eventId)}
>
来店済み
</Button>
);
}
