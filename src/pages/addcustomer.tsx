import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";

import { Flex, Spinner } from "@chakra-ui/react";
import { auth } from "../../firebase";

import AddCustomerForm from "@/components/templates/AddCustomerForm";
import { useRecoilValue } from "recoil";
import { isLoadingState } from "@/Recoil/atom";

const AddCustomer = () => {
  const isLoading = useRecoilValue(isLoadingState);
  const user = auth.currentUser;

  return (
    <>
      {user ? (
        <>
          {isLoading ? (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              height="100vh"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Flex>
          ) : (
            <>
              <Header />

              <Flex
                my={4}
                mt={20}
                direction="column"
                alignItems="center"
                justify="center"
                pb={{ base: "72px" }}
              >
                {/* フォーム */}
                <AddCustomerForm />
              </Flex>

              <Footer />
            </>
          )}
        </>
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"} height="100vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
    </>
  );
};

export default AddCustomer;
