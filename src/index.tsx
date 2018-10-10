import 'antd/dist/antd.css';
import App from 'components/App';
import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import reset from 'styled-reset'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${reset}

  html, body, #root {
    width: 100%;
    height: 100%;
  }
`;

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);
