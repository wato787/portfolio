import { IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
const EditIconButton = () => {
    return (
        <IconButton size={"sm"} aria-label='Edit' icon={<EditIcon />}/>

    );
}

export default EditIconButton;