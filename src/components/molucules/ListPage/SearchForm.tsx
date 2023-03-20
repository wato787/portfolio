import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react';

const SearchForm = () => {
  return (
    <InputGroup size="md" w="lg">
      <Input pr="4.5rem" type="text" placeholder="検索文字" />
      <InputRightElement width="4.5rem">
      <Button  size='sm'>
            検索
          </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchForm;
