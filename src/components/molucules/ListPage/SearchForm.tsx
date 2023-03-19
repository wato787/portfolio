import SearchButton from "@/components/atoms/ListPage/SearchButton";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";

const SearchForm = () => {
  return (
    <InputGroup size="md" w="lg">
      <Input pr="4.5rem" type="text" placeholder="検索文字" />
      <InputRightElement width="4.5rem">
        <SearchButton />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchForm;
