import { Box, FormLabel, HStack, Input, Radio, RadioGroup, Textarea, IconButton, Flex, Button } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import { BiAddToQueue } from 'react-icons/bi';
import styles from "../../styles/InputTypeFile.module.scss";
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputs } from '@/types/type';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useSetRecoilState } from 'recoil';
import { isLoadingState } from '@/Recoil/atom';

const AddCustomerForm = () => {
    const [visits, setVisits] = useState(0);
    const router = useRouter();
    const [nailFiles, setNailFiles] = useState<File[]>([]);
    const [faceFile, setFaceFile] = useState<File | null>(null);
  const { register, handleSubmit } = useForm<FormInputs>();
  const setIsLoading = useSetRecoilState(isLoadingState)
  const user = auth.currentUser;


  const handleNailFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setNailFiles([...nailFiles, ...newFiles]);
    }
  };

  const handleFaceFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFaceFile(files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setIsLoading(true);
    // React-Hook−Formを使うと文字列として扱われてしまう為来店回数をnumber型に変換
    data = { ...data, visits: Number(visits) };
    try {
      const nailPhotosRefs = [];
      const facePhotosRefs = [];

      for (const nailFile of nailFiles) {
        const storageRef = ref(
          storage,
          `${user?.uid}/nailphotos/${nailFile.name}`
        );
        await uploadBytes(storageRef, nailFile);
        const url = await getDownloadURL(storageRef);
        nailPhotosRefs.push(url);
      }

      if (faceFile) {
        const storageRef = ref(
          storage,
          `${user?.uid}/facephotos/${faceFile.name}`
        );
        await uploadBytes(storageRef, faceFile);
        const url = await getDownloadURL(storageRef);
        facePhotosRefs.push(url);
      }

      const infoRef = collection(db, "users", user!.uid, "info");
      const docRef = await addDoc(infoRef, {
        ...data,
        nailPhotos: nailPhotosRefs,
        facePhotos: facePhotosRefs,
      });
      await updateDoc(doc(docRef.parent, docRef.id), { id: docRef.id });

      router.push("/list");
    } catch (err) {
      console.error(err);
    }
    setIsLoading(false);
  };

    return (
       <>
        <Box textAlign="left">
        <FormLabel pl={2}>名前</FormLabel>
        <Input
          fontSize={"sm"}
          bg={"white"}
          color="black"
          w={{ base: "300px" }}
          placeholder="名前を入力してください"
          mb={4}
          {...register("name", { required: true })}
        />
      </Box>
      <Box textAlign="left">
        <FormLabel pl={2}>ニックネーム</FormLabel>
        <Input
          fontSize={"sm"}
          bg={"white"}
          color="black"
          w={{ base: "300px" }}
          placeholder="ニックネームを入力してください"
          mb={4}
          {...register("nickname", { required: true })}
        />
      </Box>
      <Box textAlign="left">
        <FormLabel pl={2}>趣味</FormLabel>
        <Input
          fontSize={"sm"}
          bg={"white"}
          color="black"
          w={{ base: "300px" }}
          placeholder="趣味を入力してください"
          mb={4}
          {...register("hobby")}
        />
      </Box>

      <Box textAlign="left">
        <FormLabel pl={2}>話題メモ</FormLabel>
        <Textarea
          fontSize={"sm"}
          bg={"white"}
          color="black"
          w={{ base: "300px" }}
          placeholder="例) 既婚or未婚"
          mb={4}
          {...register("memo")}
        />
      </Box>

      <Box textAlign="left">
        <FormLabel pl={2}>住所</FormLabel>
        <Input
          fontSize={"sm"}
          bg={"white"}
          color="black"
          w={{ base: "300px" }}
          placeholder="住所を入力してください"
          mb={4}
          {...register("address")}
        />
      </Box>

      <FormLabel>話し方</FormLabel>
      <RadioGroup fontSize={"sm"} mb={4}>
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
        <IconButton
          color={"black"}
          bg={"white"}
          onClick={() => setVisits(visits + 1)}
          aria-label="add"
          icon={<AddIcon />}
       
        />
        <Input
          bg={"white"}
          color="black"
          value={visits}
          type="number"
          w={{ base: "60px" }}
          textAlign="center"
          mb={4}
          {...register("visits")}
        />
        <IconButton
          color={"black"}
          bg={"white"}
          onClick={() => visits > 0 && setVisits(visits - 1)}
          aria-label="minus"
          icon={<MinusIcon />}
       
        />
      </HStack>

      <FormLabel mt={4}>爪の写真</FormLabel>
     {/* プレビュー表示 */}
      {nailFiles.length > 0 ? (
        <Flex
          alignItems={"center"}
          gap={1}
          justify={"center"}
          wrap={"wrap"}
        >
          {nailFiles.map((file) => (
            <Box key={file.name}>
              <Box mt={2} mb={4}>
                <Image
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  width={100}
                  height={100}
                />
              </Box>
            </Box>
          ))}
        </Flex>
      ):(
        // 選択したらボタン非表示
        <label className={styles.add} htmlFor="nailFile">
        <BiAddToQueue color="black" size={30} />
        <Input
          className={styles.file}
          bg={"white"}
          color="black"
          type="file"
          multiple
          id="nailFile"
          w={{ base: "300px" }}
          placeholder="爪の写真をアップロードしてください"
          mb={4}
          onChange={handleNailFileChange}
        />
      </label>
      )}

      <FormLabel mt={2}>顔写真</FormLabel>
      {/* プレビュー表示 */}
      {faceFile ? (
        <Box>
          <Box mt={6} mb={4}>
            <Image
              src={URL.createObjectURL(faceFile)}
              alt="preview"
              width={150}
              height={150}
            />
          </Box>
        </Box>
      ):(
        // 選択したら非表示
      <label className={styles.add} htmlFor="faceFile">
        <BiAddToQueue color="black" size={30} />

        <Input
          className={styles.file}
          bg={"white"}
          id="faceFile"
          color="black"
          type="file"
          w={{ base: "300px" }}
          placeholder="顔写真をアップロードしてください"
          mb={4}
          onChange={handleFaceFileChange}
        />
      </label>

      )}

      <Button
        mt={8}
        fontSize={"md"}
        bg="white"
        color={"black"}
        onClick={handleSubmit(onSubmit)}
        leftIcon={<AddIcon />}
      >
        顧客情報を追加
      </Button>
      </>

    );
}

export default AddCustomerForm;