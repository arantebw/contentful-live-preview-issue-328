import { gql } from "@apollo/client";
import { client, context, fetchPolicy } from "./client";
import { Homepage } from "../types";

const GET_HOMEPAGE = gql`
  query {
    homePageCollection {
      items {
        sys {
          id
          __typename
        }
        welcomeMessage
        whyGfedYouTubeId
      }
    }
  }
`;

export const getHomePage = async (preview = false) => {
  try {
    const variables = { isPreview: preview };
    const homepage = await client.query({
      query: GET_HOMEPAGE,
      context: context(preview),
      fetchPolicy,
      variables,
    });

    return homepage.data.homePageCollection.items[0] as Homepage;
  } catch {
    return {};
  }
};
