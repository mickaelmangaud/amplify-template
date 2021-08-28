import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial, Helvetica, sans-serif;
  }
  
  body, #__next{
    height: 100vh;
    background-color: #eee;
  }
`;
