import { AccordionPanel, Flex, Text } from '@chakra-ui/react';
import EditIconButton from './EditIconButton';

const AccordionItemPanel = ({value}:{value:string|number}) => {
    return (
        <AccordionPanel pb={2}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{value}</Text>
          <EditIconButton />
        </Flex>
      </AccordionPanel>
    );
}

export default AccordionItemPanel;