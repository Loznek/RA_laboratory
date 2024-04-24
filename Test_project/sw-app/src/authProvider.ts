import { gql } from "@apollo/client";
import { AuthProvider, UserIdentity } from "react-admin";
import { client } from "./apolloClient";

const LOGIN_MUTATION = gql`
  mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const USER = "user";

const authProvider: AuthProvider = {
  login: async function ({ username, password }): Promise<any> {
    const login = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email: username, password },
    });
    if (login.data?.authenticateUserWithPassword?.sessionToken) {
      setUser(login.data.authenticateUserWithPassword.item);

      return;
    } else if (login.data?.authenticateUserWithPassword?.message) {
      throw new Error(login.data?.authenticateUserWithPassword?.message);
    }
    // TODO
    throw new Error("The application has encountered an unknown error.");
  },
  logout: () => {
    clearUser();
    return Promise.resolve();
  },
  checkAuth: (): Promise<void> => {
    return hasUser() ? Promise.resolve() : Promise.reject();
  },
  checkError: function (): Promise<void> {
    return Promise.resolve();
  },
  getPermissions: (): Promise<any> => {
    if (hasUser()) {
      return Promise.resolve("");
    } else {
      return Promise.resolve("");cd
    }
  },
  getIdentity: (): Promise<UserIdentity> => {
    const user = getUser();
    return Promise.resolve({ id: user.id, fullName: user.name });
  },
};

const getUser = (): { id: string; name: string;} => {
  const localStorageUser = localStorage.getItem(USER);
  if (!localStorageUser) {
    throw new Error();
  }
  return JSON.parse(localStorageUser);
};
const hasUser = (): boolean => {
  return !!localStorage.getItem(USER);
};

const setUser = (user: { id: string; name: string;}): void => {
  localStorage.setItem(USER, JSON.stringify(user));
};

const clearUser = () => {
  localStorage.removeItem(USER);
};

export { authProvider };
