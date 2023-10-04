import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master`,
  cache: new InMemoryCache()
});

export const context = (preview = false) => {
  let token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  if (preview) {
    token = process.env.NEXT_PUBLIC_NEXT_CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const fetchPolicy = 'network-only';
