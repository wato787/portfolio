import LoginButton from "@/components/atoms/LoginPage/LoginButton";
import { Checkbox, Stack } from "@chakra-ui/react";
import {Link}from "@chakra-ui/react"

const RemFor = () => {
    return (
        <Stack spacing={10}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align={"start"}
          justify={"space-between"}
        >
          <Checkbox>Remember me</Checkbox>
          <Link color={"blue.400"}>Forgot password?</Link>
        </Stack>
       <LoginButton/>
      </Stack>
    );
}

export default RemFor;