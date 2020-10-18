import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import '../styles/globals.css';
import styled from 'styled-components';

const Container = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 60px;
    margin: 0;
    font-size: 14px;
`

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
        <ApolloProvider client={client}>
            <Container>
                <Component {...pageProps} />
            </Container>
        </ApolloProvider>
  )
}

export default MyApp
