import React, { useEffect, useRef } from "react";
import * as S from "../components/login/styles";
import Input from "../components/login/input";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Cookies } from "react-cookie";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const cookies = new Cookies();

  useEffect(() => {
    const token = cookies.get("TOKEN");
    console.log(token);

    if (token) {
      window.location.href = "/";
    }
  }, []);

  return (
    <S.LoginWrapper>
      <S.LogoImg>LOGO</S.LogoImg>
      <S.WelcomeText>Welcome!</S.WelcomeText>
      <S.LoginContainer>
        <S.InputGroupContainer>
          <Input placeholder="Email address" type="email" inputRef={emailRef} />
          <Input
            placeholder="Password"
            type="password"
            inputRef={passwordRef}
          />
        </S.InputGroupContainer>
        <S.ButtonContainer>
          <S.LoginExplainText>
            By continuing, you agree to Futurecast’s Consumer Terms and
            <br />
            Acceptable Use Policy, and acknowledge their Privacy Policy.
          </S.LoginExplainText>
          <S.Button
            onClick={async () => {
              if (emailRef.current && emailRef.current.value === "") {
                alert("이메일을 입력해주세요.");
                return;
              }
              if (passwordRef.current && passwordRef.current.value === "") {
                alert("패스워드를 입력해주세요.");
                return;
              }
              console.log(emailRef.current?.value, passwordRef.current?.value);
              await signInWithEmailAndPassword(
                auth,
                emailRef.current?.value ?? "",
                passwordRef.current?.value ?? ""
              )
                .then(async (resuserCredential) => {
                  const user = resuserCredential.user;

                  console.log(user);

                  const idToken = await user.getIdToken();

                  console.log(idToken);

                  cookies.set("TOKEN", idToken);

                  window.location.replace("/");
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;

                  alert(`${errorMessage}`);
                });
            }}
          >
            Continue
          </S.Button>
        </S.ButtonContainer>
      </S.LoginContainer>
    </S.LoginWrapper>
  );
};

export default LoginPage;
