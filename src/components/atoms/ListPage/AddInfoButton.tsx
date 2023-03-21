import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { Button} from "@chakra-ui/react";
import { useRouter } from 'next/router';

const AddInfoButton = ({text}:{text:string}) => {
    const router = useRouter();
    return (
        <>
       <Button onClick={()=>router.push('/addInfo')} rightIcon={<AddIcon/>}  variant='outline' colorScheme="blackAlpha" size="md">{text}</Button>

        </>
    );
}

export default AddInfoButton