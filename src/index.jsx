/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify'
import config from '/src/amplify/auth-email'

Amplify.configure(config)



render(() => <App />, document.getElementById('root'));
