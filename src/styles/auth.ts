import styled from 'styled-components';

export const AuthScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2c3e50;
`;

export const Form = styled.form`
  position: relative;
  z-index: 1;
  background: #ffffff;
  width: 480px;
  max-width: 90%;
  height: 424px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
`;

export const Title = styled.h1`
  margin-bottom: 60px;
`;

export const Input = styled.input`
  font-family: 'Roboto', sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`;

export const Submit = styled.button`
  text-transform: uppercase;
  outline: 0;
  background: #3498db;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #43a047;
  }
`;

export const Text = styled.div`
  font-size: 14px;
  margin-top: 6px;
`;

export const ForgotPassword = styled(Text)`
  /* text-align: left; */
  margin: -6px 0 0 1px;
  font-size: 12px;
  color: #aaa;
`;

export const SocialButton = styled(Submit)`
  margin: 12px 0;
  width: 48%;
`;
