import SearchForm from "@/components/molucules/ListPage/SearchForm";
import ListCard from "@/components/organisms/Listpage/ListCard";
import InfoCard from "@/components/organisms/TopPage/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { Flex } from "@chakra-ui/react";
import AddInfoButton from '@/components/atoms/ListPage/AddInfoButton';

const list = () => {
    return (
        <>
        <Header/>
          {/* 情報の追加ボタン */}
      <Flex align="center" justify="center" mt="4">
        <AddInfoButton  text={"顧客情報追加"} />
      </Flex>
        {/* 検索 */}
        <Flex align="center" justify="center" mt={4}>
        <SearchForm/>
        </Flex>

        {/* リスト表示 */}
        <Flex mt={4} wrap="wrap" align="center" justify="center" columnGap="24px" pb={{base:"72px"}}>
            <ListCard/>
            <ListCard/>
            <ListCard/>
            <ListCard/>
        <p>ページネーション10こずつ</p>
        </Flex>
        <Footer/>
        </>
    );
}

export default list;