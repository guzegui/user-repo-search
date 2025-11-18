// Fetch user-owned public repos
export const GET_USER_REPOS_FOR_UI = `
  query GetUserReposForUi($login: String!, $first: Int!, $after: String) {
    user(login: $login) {
      login
      name
      avatarUrl
      url

      repositories(
        first: $first
        after: $after
        orderBy: { field: UPDATED_AT, direction: DESC }
        ownerAffiliations: OWNER
        privacy: PUBLIC
      ) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          name
          url
          description
          updatedAt
          stargazerCount
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;
