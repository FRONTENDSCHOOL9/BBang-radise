import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import useMemberStore from '@zustand/memberStore.mjs';
import Input from '@components/ui/Input';
import Button from '@components/ui/button/Button';
import useUserApis from '@hooks/apis/useUserApis.mjs';
import Section from '@components/ui/Section';
import * as S from '@styles/login/login.style';
import Text from '@components/ui/Text';
import Toast from '@components/ui/Toast';
import { useState } from 'react';
import Submit from '@components/ui/button/Submit';

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { postLogin } = useUserApis();
  const [toast, setToast] = useState({
    show: false,
    message: '',
  });

  // zustand setter 반환
  const setUserData = useMemberStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    values: {
      email: 'seller1@market.com',
      password: '11111111',
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    try {
      const res = await postLogin(formData);
      console.log(res);

      setUserData({
        _id: res.data.item._id,
        name: res.data.item.name,
        profile: res.data.item.profileImage,
        type: res.data.item.type,
        token: res.data.item.token,
      });
      setToast({ show: true, message: `${res.data.item.name}님 로그인 되었습니다.` });
      setTimeout(() => {
        navigate(location.state?.from ? location.state?.from : '/');
      }, 3000);
    } catch (err) {
      console.log(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach((error) => setError(error.path, { message: error.msg }));
      } else if (err.response?.data.message) {
        setToast({ show: true, message: err.response?.data.message });
      }
    }
  };

  return (
    <Section>
      <S.LoginWrapper>
        <Text typography="display_l">로그인</Text>

        {toast.show && <Toast setToast={setToast} text={toast.message} />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <S.LoginFormWrapper>
            <S.LoginInputWrapper>
              <div>
                <Input
                  type="email"
                  id="email"
                  label="이메일"
                  placeholder="이메일을 입력하세요"
                  error={errors.email && errors.email.message}
                  {...register('email', {
                    required: '이메일을 입력하세요.',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: '이메일 형식이 아닙니다.',
                    },
                  })}
                />
              </div>
              <div>
                <Input
                  type="password"
                  id="password"
                  label="비밀번호"
                  placeholder="비밀번호를 입력하세요"
                  error={errors.password && errors.password.message}
                  {...register('password', {
                    required: '비밀번호를 입력하세요.',
                  })}
                />
              </div>
            </S.LoginInputWrapper>

            <S.LoginButton>
              <Submit>로그인</Submit>
              <Button
                type="button"
                color="var(--primary-02)"
                onClick={() => {
                  navigate('/signup');
                }}
              >
                회원가입
              </Button>
            </S.LoginButton>
          </S.LoginFormWrapper>
        </form>
      </S.LoginWrapper>
    </Section>
  );
}

export default Login;
