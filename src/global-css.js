import { injectGlobal } from 'styled-components';

injectGlobal`
  *,*::before,*::after{
      margin:0;
      padding:0;
  }
  body {
    font-size:62.5%;
    background:linear-gradient(to left, #fedcba, #abcdef);
  }
  p { 
    font-size:1.2rem;
  }
`;