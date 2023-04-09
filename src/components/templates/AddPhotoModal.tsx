import {
  Modal,
  Flex,
  Spinner,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Center,
  Input,
  Box,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { auth, db, storage } from "../../../firebase";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import styles from "../../styles/InputTypeFile.module.scss";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from 'recoil';
import { nailPhotoListState } from "@/Recoil/atom";

interface Props {
  isOpen: boolean;
  onClose: ()=>void;
  id:string
}

const AddPhotoModal = ({ isOpen, onClose ,id}: Props) => {
  const [nailFiles, setNailFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const setNailPhotoList = useSetRecoilState(nailPhotoListState)

  const user = auth.currentUser;
  // storageにいれる
  const handleNailFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setNailFiles([...nailFiles, ...newFiles]);
    }
  };
  const AddNailPhotos = async (infoId: string) => {
    setIsLoading(true);
    const nailPhotosRefs: string[] = [];

    for (const nailFile of nailFiles) {
      const storageRef = ref(
        storage,
        `${user?.uid}/nailphotos/${nailFile.name}`
      );
      await uploadBytes(storageRef, nailFile);
      const URL = await getDownloadURL(storageRef);
      nailPhotosRefs.push(URL);
    }

    const infoDocRef = doc(db, "users", user!.uid, "info", infoId);
    await updateDoc(infoDocRef, {
      nailPhotos: arrayUnion(...nailPhotosRefs),
    });

    const updatedDoc = await getDoc(infoDocRef);
    const updatedData = updatedDoc.data();
    const updatedNailPhotoList = updatedData?.nailPhotos ?? [];
    setNailPhotoList(updatedNailPhotoList);
    setNailFiles([]);
    onClose();
    setIsLoading(false);
  };

  const cancelAddPhoto = () => {
    setNailFiles([]);

    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={cancelAddPhoto}>
      {/* スピナー */}
      {isLoading && (
        <Flex
          align={"center"}
          justify={"center"}
          h={"100%"}
          position={"fixed"}
          top={0}
          left={0}
          zIndex={9999}
          bg={"rgba(0, 0, 0, 0.5)"}
          w={"100%"}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.400"
            size="xl"
          />
        </Flex>
      )}
      <ModalOverlay />
      <ModalContent mx={6}>
        <ModalHeader textAlign={"center"} color={"black"}>
          写真追加
        </ModalHeader>
        <ModalCloseButton color={"black"} />
        <ModalBody pb={2}>
          <FormControl>
            <Center>
              <label className={styles.add} htmlFor="addFaceFile">
                <BiAddToQueue color="black" size={30} />
                <Input
                  type="file"
                  id="addFaceFile"
                  multiple
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleNailFileChange}
                />
              </label>
            </Center>

            {/* プレビュー表示 */}

            {nailFiles.length > 0 && (
              <Flex
                alignItems={"center"}
                justify={"center"}
                gap="4"
                wrap={"wrap"}
              >
                {nailFiles.map((file) => (
                  <Box key={file.name}>
                    <Box my={1}>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        width={100}
                        height={100}
                        layout="intrinsic"
                      />
                    </Box>
                  </Box>
                ))}
              </Flex>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={"black"}
            color="white"
            mr={3}
            onClick={() => AddNailPhotos(id)}
          >
            追加
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPhotoModal;
