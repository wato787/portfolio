import { useEffect, useState } from "react";
import SearchForm from "@/components/molucules/ListPage/SearchForm";
import ListCard from "@/components/organisms/Listpage/ListCard";
import InfoCard from "@/components/organisms/TopPage/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { Flex } from "@chakra-ui/react";
import AddInfoButton from "@/components/atoms/ListPage/AddInfoButton";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListData } from "@/hooks/useListData";

const List = () => {
    const listData = useListData();


  return (
    <>
      <Header />
      <Flex align="center" justify="center" mt="4">
        <AddInfoButton text={"顧客情報追加"} />
      </Flex>
      <Flex align="center" justify="center" mt={4}>
        <SearchForm />
      </Flex>
      <Flex
        mt={4}
        wrap="wrap"
        align="center"
        justify="center"
        columnGap="24px"
        pb={{ base: "72px" }}
      >
        {listData.map((data:any) => (
          <ListCard data={data} key={data.id} />
        ))}
        <p>ページネーション10こずつ</p>
      </Flex>
      <Footer />
    </>
  );
};

export default List;
