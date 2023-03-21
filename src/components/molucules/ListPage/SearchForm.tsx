import { SearchIcon } from '@chakra-ui/icons';
import { InputGroup, Input, InputRightElement, Button, IconButton } from '@chakra-ui/react';

const SearchForm = () => {
  return (
    <InputGroup size="md" w="s">
      <Input pr="4.5rem" type="text" placeholder="検索文字" />
      <InputRightElement width="2.5rem">
      <IconButton
  colorScheme='blue'
  aria-label='Search database'
  icon={<SearchIcon />}
/>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchForm;
