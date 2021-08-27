import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * { 
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #eee;
    font-family: Arial, Helvetica, sans-serif;
  }

  border-style, #__next{
    height: 100vh;
  }
`;
