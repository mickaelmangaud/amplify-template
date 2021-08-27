import styled from 'styled-components';

export const AuthScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 460px;
  height: 480px;
  background-color: white;
  border-radius: 3px;
  box-shadow: 0px 0px 2px 3px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  margin-bottom: 60px;
`;

export const Input = styled.input`
  padding: 12px 18px;
  border-radius: 3px;
  margin: 12px auto;
  border: none;
  width: 90%;
  max-width: 350px;
`;

export const Submit = styled.button`
  padding: 12px 18px;
  border-radius: 3px;
  margin: 12px auto;
  width: 90%;
  max-width: 350px;
  border: none;
  background-color: #88e988;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
`;
