import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";


const LoginButton = () => {
  const router= useRouter();
    return (
        <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  //仮のクリックイベント
                  onClick={()=>router.push('/home')}
                >
                  Sign in
                </Button>
    );
}

export default LoginButton;