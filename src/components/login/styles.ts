import styled from "styled-components";

export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const LoginContainer = styled.div`
  background-color: ${({ theme }) => theme.color.grey};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
  border-radius: 16px;
  box-sizing: border-box;
`;

export const InputContainer = styled.div`
  position: relative;
  /* cursor: vertical-text; */
`;

export const InputGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputIcon = styled.div`
  width: 16px;
  height: 16px;
  /* background-color: #d9d9d9; */
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const InputText = styled.input`
  border: 1px solid ${({ theme }) => theme.color.divider};
  background-color: ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.black};
  cursor: text;
  border-radius: 8px;
  box-sizing: border-box;
  width: 318px;
  height: 40px;
  padding-left: 40px;
  font-size: 14px;
  padding-right: 16px;

  &::placeholder {
    color: #a4a4a4;
  }

  &:focus {
    outline: none;
  }
`;

export const WelcomeText = styled.div`
  font-size: 52px;
  color: ${({ theme }) => theme.color.black};
`;

export const LogoImg = styled.div`
  top: 10px;
  left: 16px;
  position: fixed;
  font-size: 42px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

export const LoginExplainText = styled.div`
  width: 318px;
  font-size: 10px;
  text-align: center;
  color: #757575;
`;

export const Button = styled.div`
  box-sizing: border-box;
  width: 318px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5661f6;
  font-size: 18px;
  box-sizing: border-box;
  color: white;
  border-radius: 8px;

  &:active {
    background-color: #7981f6;
  }
`;
