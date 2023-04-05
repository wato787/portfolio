import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";

const AddInfoButton = () => {
  const router = useRouter();
  return (
    <>
      <IconButton
        color={"blue.800"}
        borderRadius={"50%"}
        zIndex={999}
        position={"fixed"}
        bottom={"88px"}
        right={10}
        aria-label="add"
        icon={<AddIcon />}
        bg={"white"}
        onClick={() => router.push("/addInfo")}
        variant="outline"
        colorScheme="blackAlpha"
        size="md"
      />
    </>
  );
};

export default AddInfoButton;
