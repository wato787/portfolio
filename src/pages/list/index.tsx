import { useState } from "react";
import ListCard from "@/components/organisms/ListCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { Flex, Spinner, Input, Button, Box } from "@chakra-ui/react";
import AddInfoButton from "@/components/atoms/AddInfoButton";
import { auth } from "../../../firebase";
import { useListData } from "@/hooks/useListData";
import { UserInfo } from "@/types/type";

const List = () => {
  const user = auth.currentUser;
  const listData: UserInfo[] = useListData();
  const [searchValue, setSearchValue] = useState("");
  const [displayCount, setDisplayCount] = useState<number>(30);
  const filteredListData = listData.filter((data: UserInfo) => {
    // 名前に入力値が含まれている場合に表示する
    return data.name.includes(searchValue);
  });

  const displayData = filteredListData.slice(0, displayCount);

  return (
    <>
      {user ? (
        <>
          <Header />
            <AddInfoButton  />
          <Flex  align="center" justify="center" mt={20}>
            <Input
            bg={"white"}
            color={"black"}
              w={60}
              pr="4.5rem"
              type="text"
              placeholder="名前検索"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Flex>
          <Box pb={"88px"}>
            <Flex
              mt={2}
              wrap="wrap"
              align="center"
              justify="center"
              columnGap="24px"
            >
              {displayData.map((data: UserInfo) => (
                <ListCard data={data} key={data.id} />
              ))}
            </Flex>
            {filteredListData.length > displayCount && (
              <Flex
                align="center"
                justify="center"
                mt={4}
                pb={{ base: "72px" }}
              >
                <Button onClick={() => setDisplayCount(displayCount + 30)}>
                  もっと見る
                </Button>
              </Flex>
            )}
          </Box>
          <Footer />
        </>
      ) : (
        <Flex justifyContent={"center"} alignItems={"center"} height= '100vh'>

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

export default List;
