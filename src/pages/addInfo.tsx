import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";
import { FormValues } from "@/types/AddInfoPage/type";
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
import { SubmitHandler, useForm } from "react-hook-form";



const AddInfo = () => {
  const { register, handleSubmit } = useForm<FormValues>();
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // データの処理
    console.log(data);
  };
  return (
    <>
      <Header />

      <Flex direction="column" alignItems="center" justify="center">
        {/* 名前追加 */}
        <Box textAlign="left">
          <FormLabel pl={2}>名前</FormLabel>
          <Input
            w="lg"
            placeholder="名前を入力してください"
            mb={4}
            {...register("name", { required: true })}
          />
        </Box>
        <Box textAlign="left">
          <FormLabel pl={2}>ニックネーム</FormLabel>
          <Input
            w="lg"
            placeholder="ニックネームを入力してください"
            mb={4}
            {...register("nickname", { required: true })}
          />
        </Box>
        <Box textAlign="left">
          <FormLabel pl={2}>趣味</FormLabel>
          <Input
            w="lg"
            placeholder="趣味を入力してください"
            mb={4}
            {...register("hobby")}
          />
        </Box>
        
        <Box textAlign="left">
          <FormLabel pl={2}>話題メモ</FormLabel>
          <Textarea
            w="lg"
            placeholder="例) 既婚or未婚"
            mb={4}
            {...register("hobby")}
          />
        </Box>

        <Box textAlign="left">
          <FormLabel pl={2}>住所</FormLabel>
          <Input
            w="lg"
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
          <Button {...inc}>+</Button>
          <Input {...input} {...register("visits")} w={14}/>
          <Button {...dec}>-</Button>
        </HStack>

        <FormLabel>爪の写真</FormLabel>
        <Input
          type="file"
          w="lg"
          placeholder="爪の写真をアップロードしてください"
          mb={4}
          {...register("nailPhoto")}
        />

        <FormLabel>顔写真</FormLabel>
        <Input
          type="file"
          w="lg"
          placeholder="顔写真をアップロードしてください"
          mb={4}
          {...register("facePhoto")}
        />

        <Button colorScheme="blue" onClick={handleSubmit(onSubmit)}>
          情報を追加する
        </Button>
      </Flex>

      <Footer/>
    </>
  );
};

export default AddInfo;
