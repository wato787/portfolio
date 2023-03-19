import SearchForm from "@/components/molucules/ListPage/SearchForm";
import InfoCard from "@/components/organisms/TopPage/InfoCard";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { Flex } from "@chakra-ui/react";

const list = () => {
    return (
        <>
        <Header/>
        {/* 検索 */}
        <Flex align="center" justify="center" mt={4}>
        <SearchForm/>
        </Flex>
        {/* リスト表示 */}
        <Flex mt={8} wrap="wrap" align="center" justify="center" columnGap="24px">
            <InfoCard/>
            <InfoCard/>
            <InfoCard/>
            <InfoCard/>
        </Flex>
        <Footer/>
        </>
    );
}

export default list;