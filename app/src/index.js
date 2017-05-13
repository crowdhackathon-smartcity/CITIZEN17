import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {IntlProvider} from 'react-intl';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Render = () => (
    <IntlProvider locale='en'>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
    </IntlProvider>
);

ReactDOM.render(
  <Render />,
  document.getElementById('root')
);
