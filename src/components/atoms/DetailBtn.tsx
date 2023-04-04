import { Button } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { UserInfo } from '../../types/type';

const DetailBtn = ({data}:{data:UserInfo}) => {
    const router = useRouter();
    return (
        <Button
        px={8}
        fontSize={"sm"}
        rounded={"full"}
        bg={"white"} 
        color={"black"} 
        border={".5px solid black"} 
        _hover={{
          bg: "black", 
          color: "white", 
        }}
        _focus={{
          bg: "black",
          color: "white", 
        }}
        onClick={() => router.push(`/list/${data.id}`)}
      >
        詳細
      </Button>
    );
}

export default DetailBtn;