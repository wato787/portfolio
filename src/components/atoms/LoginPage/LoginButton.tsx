import { Button } from "@chakra-ui/react";


const LoginButton = ({onClick}:any) => {
    return (
        <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={onClick}
                >
                  Sign in
                </Button>
    );
}

export default LoginButton;