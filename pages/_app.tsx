import '../styles/globals.css';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from '../theme/theme';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:3000/api/graphql',
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
