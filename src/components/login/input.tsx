import React, { RefObject } from "react";
import * as S from "./styles";

type Props = {
  placeholder: string;
  type: string;
  inputRef: RefObject<HTMLInputElement>;
};

const Input = ({ placeholder, type, inputRef }: Props) => {
  return (
    <S.InputContainer>
      <S.InputIcon />
      <S.InputText type={type} placeholder={placeholder} ref={inputRef} />
    </S.InputContainer>
  );
};

export default Input;
