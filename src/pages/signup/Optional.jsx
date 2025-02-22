import Input from '@components/ui/Input';
import TextArea from '@components/ui/TextArea';
import { useForm } from 'react-hook-form';
import Submit from '@components/ui/button/Submit';
import * as S from '@styles/signup/signup.style';
import useFormStore from '@zustand/formStore.mjs';
import PropTypes from 'prop-types';

Optional.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

function Optional({ onSubmit }) {
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const { formData } = useFormStore((state) => ({
    formData: state.formData,
  }));

  // useEffect(() => {
  //   if (formData)
  //     reset({
  //       profileImage: formData.profileImage,
  //       introduction: formData.introduction,
  //     });
  // }, [formData]);

  // const handlePrevButtonClick = (data) => {
  //   handleSubmit(onSaveFormData)();
  //   const mergedData = { ...formData, ...data };
  //   setFormData(mergedData);
  //   setStep(0);
  // };

  const onOptionalSubmit = (data) => {
    console.log(data);
    const mergedData = { ...formData, ...data };
    onSubmit(mergedData);
    console.log(mergedData);
  };

  return (
    <>
      <S.SignUpForm onSubmit={handleSubmit(onOptionalSubmit)}>
        <div>
          <Input type="file" accept="image/*" id="profileImage" label="프로필 이미지" placeholder="이미지를 선택하세요" {...register('profileImage')} />
        </div>
        <div>
          <TextArea label="자기소개 (40자 이내)" type="txt" id="introduction" placeholder="자기소개를 입력해주세요" rows="5" {...register('introduction')} />
        </div>
        {/* <div>
          <Button onClick={handlePrevButtonClick}>이전</Button>
        </div> */}
        <div>
          <Submit>회원가입</Submit>
        </div>
      </S.SignUpForm>
    </>
  );
}

export default Optional;
