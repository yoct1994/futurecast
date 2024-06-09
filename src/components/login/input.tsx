import React, { RefObject } from "react";
import * as S from "./styles";
import { ReactComponent as Mail } from "../../assets/login/mail.svg";
import { ReactComponent as Password } from "../../assets/login/password.svg";

type Props = {
  placeholder: string;
  type: string;
  inputRef: RefObject<HTMLInputElement>;
};

const Input = ({ placeholder, type, inputRef }: Props) => {
  return (
    <S.InputContainer>
      <S.InputIcon>{type === "email" ? <Password /> : <Mail />}</S.InputIcon>
      <S.InputText type={type} placeholder={placeholder} ref={inputRef} />
    </S.InputContainer>
  );
};

export default Input;
