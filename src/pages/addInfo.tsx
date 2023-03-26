import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { FormInputs } from "@/types/AddInfoPage/type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  Flex,
  FormLabel,
  Input,
  Button,
  Box,
  RadioGroup,
  Radio,
  HStack,
  useNumberInput,
  Textarea,
} from "@chakra-ui/react";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/router';

const AddInfo = () => {
  const router = useRouter();
  const [nailFiles, setNailFiles] = useState<any>([]);
  const [faceFiles, setFaceFiles] = useState<any>([]);

  const handleNailFileChange = (event:any) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    setNailFiles([...nailFiles, ...newFiles]);
  };

  const handleFaceFileChange = (event:any) => {
    const files = event.target.files;
    const newFiles = Array.from(files);
    setFaceFiles([...faceFiles, ...newFiles]);
  };
  const { register, handleSubmit } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {

    try {
      const user = auth.currentUser;

      const nailPhotosRefs = [];
      const facePhotosRefs = [];
  
      for (const nailFile of nailFiles) {
        const storageRef = ref(storage, `${user?.uid}/nailphotos/${nailFile.name}`);
        await uploadBytes(storageRef, nailFile);
        const url = await getDownloadURL(storageRef);
        nailPhotosRefs.push(url);
      }
  
      for (const faceFile of faceFiles) {
        const storageRef = ref(storage, `${user?.uid}/facephotos/${faceFile.name}`);
        await uploadBytes(storageRef, faceFile);
        const url = await getDownloadURL(storageRef);
        facePhotosRefs.push(url);
      }


      const infoRef = collection(db, "users", user!.uid, "info");
      const docRef =await addDoc(infoRef, {
        ...data,
        nailPhotos: nailPhotosRefs,
        facePhotos: facePhotosRefs,
      });
      await updateDoc(doc(docRef.parent, docRef.id), { id: docRef.id });

      router.push('/list')
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <>
      <Header />

      <Flex
        my={4}
        direction="column"
        alignItems="center"
        justify="center"
        pb={{ base: "72px" }}
      >
        {/* 名前追加 */}
        <Box textAlign="left">
          <FormLabel pl={2}>名前</FormLabel>
          <Input
            w={{ base: "300px" }}
            placeholder="名前を入力してください"
            mb={4}
            {...register("name", { required: true })}
          />
        </Box>
        <Box textAlign="left">
          <FormLabel pl={2}>ニックネーム</FormLabel>
          <Input
            w={{ base: "300px" }}
            placeholder="ニックネームを入力してください"
            mb={4}
            {...register("nickname", { required: true })}
          />
        </Box>
        <Box textAlign="left">
          <FormLabel pl={2}>趣味</FormLabel>
          <Input
            w={{ base: "300px" }}
            placeholder="趣味を入力してください"
            mb={4}
            {...register("hobby")}
          />
        </Box>

        <Box textAlign="left">
          <FormLabel pl={2}>話題メモ</FormLabel>
          <Textarea
            w={{ base: "300px" }}
            placeholder="例) 既婚or未婚"
            mb={4}
            {...register("memo")}
          />
        </Box>

        <Box textAlign="left">
          <FormLabel pl={2}>住所</FormLabel>
          <Input
            w={{ base: "300px" }}
            placeholder="住所を入力してください"
            mb={4}
            {...register("address")}
          />
        </Box>

        <FormLabel>話し方</FormLabel>
        <RadioGroup mb={4}>
          <HStack spacing={8}>
            <Radio {...register("language")} value="タメ口">
              タメ口
            </Radio>
            <Radio {...register("language")} value="敬語">
              敬語
            </Radio>
          </HStack>
        </RadioGroup>

        <FormLabel>爪の厚さ</FormLabel>
        <RadioGroup mb={4}>
          <HStack spacing={8}>
            <Radio {...register("nailThickness")} value="薄い">
              薄い
            </Radio>
            <Radio {...register("nailThickness")} value="厚い">
              厚い
            </Radio>
          </HStack>
        </RadioGroup>

        <FormLabel>浮きやすい部分</FormLabel>
        <RadioGroup mb={4}>
          <HStack spacing={8}>
            <Radio {...register("floatingPart")} value="根本">
              根本
            </Radio>
            <Radio {...register("floatingPart")} value="爪先">
              爪先
            </Radio>
          </HStack>
        </RadioGroup>

        <FormLabel>油分</FormLabel>
        <RadioGroup mb={4}>
          <HStack spacing={8}>
            <Radio {...register("oiliness")} value="多い">
              多い
            </Radio>
            <Radio {...register("oiliness")} value="少ない">
              少ない
            </Radio>
          </HStack>
        </RadioGroup>

        <FormLabel>来店回数</FormLabel>
        <HStack align="center">
          {/* <Input {...input} {...register("visits")} w={14} /> */}
          <Input
          type={"number"}
            w={{ base: "150px" }}
            placeholder="来店回数"
            mb={4}
            {...register("visits")}
          />
        </HStack>

        <FormLabel  mt={2}>爪の写真</FormLabel>
        <Input
          type="file"
          multiple
          w={{ base: "300px" }}
          placeholder="爪の写真をアップロードしてください"
          mb={4}
          onChange={handleNailFileChange}
        />

        <FormLabel mt={2}>顔写真</FormLabel>
        <p>写真選択したらプレビュー表示する</p>
        <Input
          type="file"
          w={{ base: "300px" }}
          placeholder="顔写真をアップロードしてください"
          mb={4}
          onChange={handleFaceFileChange}
        />

        <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
          情報を追加する
        </Button>
      </Flex>

      <Footer />
    </>
  );
};

export default AddInfo;
