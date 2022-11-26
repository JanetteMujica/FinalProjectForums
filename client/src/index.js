// node packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

// components
import App from './App';

// context import
import AllModulesProvider from './components/Context/AllModulesContext';

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Auth0Provider
			domain={REACT_APP_AUTH0_DOMAIN}
			clientId={REACT_APP_AUTH0_CLIENT_ID}
			redirectUri={window.location.origin}
		>
			<AllModulesProvider>
				<App />
			</AllModulesProvider>
		</Auth0Provider>
	</React.StrictMode>
);
