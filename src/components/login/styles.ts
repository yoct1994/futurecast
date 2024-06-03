import styled from "styled-components";

export const LoginWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  flex-direction: column;
  box-sizing: border-box;
`;

export const LoginContainer = styled.div`
  width: 500px;
  height: 400px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding-top: 45px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 30px;
  box-sizing: border-box;
`;

export const InputContainer = styled.div`
  position: relative;
`;

export const InputGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const InputIcon = styled.div`
  width: 22px;
  height: 22px;
  background-color: #d9d9d9;
  position: absolute;
  left: 18px;
  top: 16.5px;
`;

export const InputText = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 55px;
  padding-left: 52px;
  font-size: 16px;
  padding-right: 16px;

  &::placeholder {
    color: #a4a4a4;
  }

  &:focus {
    outline: none;
  }
`;

export const WelcomeText = styled.div`
  font-size: 55px;
  color: black;
`;

export const LogoImg = styled.div`
  top: 30px;
  left: 50px;
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
  padding-left: 21px;
  padding-right: 21px;
`;

export const LoginExplainText = styled.div`
  font-size: 12px;
  color: #555555;
`;

export const Button = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  font-size: 16px;
  box-sizing: border-box;

  &:active {
    background-color: grey;
  }
`;
