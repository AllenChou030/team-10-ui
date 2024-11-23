import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

const userPoolId = 'us-west-1_xa5ZVFQGI';
const clientId = '666c6gsd18rfas8fv4jfbc69i6';

const poolData = {
  UserPoolId: userPoolId,
  ClientId: clientId,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);
let currentUser: CognitoUser | null = userPool.getCurrentUser();

export function getCurrentUser(): CognitoUser | null {
  return currentUser;
}

function getCognitoUser(username: string): CognitoUser {
  return new CognitoUser({
      Username: username,
      Pool: userPool,
  });
}

export async function getSession(): Promise<CognitoUserSession> {
  if (!currentUser) {
      currentUser = userPool.getCurrentUser();
  }
  if (!currentUser) {
      throw new Error('No user is currently signed in.');
  }

  return new Promise((resolve, reject) => {
      currentUser?.getSession((err, session) => {
          if (err) {
              reject(err);
          } else {
              resolve(session);
          }
      });
  });
}

export async function signUpUserWithEmail(
  username: string,
  email: string,
  password: string
): Promise<any> {
  return new Promise((resolve, reject) => {
      const attributeList: CognitoUserAttribute[] = [
          new CognitoUserAttribute({
              Name: 'email',
              Value: email,
          }),
      ];

      userPool.signUp(username, password, attributeList, [], (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      });
  });
}

export async function verifyCode(username: string, code: string): Promise<string> {
  const cognitoUser = getCognitoUser(username);

  return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(code, true, (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result as string);
          }
      });
  });
}

export async function signInWithEmail(username: string, password: string): Promise<any> {
  const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
  });

  currentUser = getCognitoUser(username);

  return new Promise((resolve, reject) => {
      currentUser?.authenticateUser(authenticationDetails, {
          onSuccess: (res) => resolve(res),
          onFailure: (err) => reject(err),
      });
  });
}

export function signOut(): void {
  currentUser?.signOut();
  currentUser = null;
}

export async function getAttributes(): Promise<CognitoUserAttribute[]> {
  if (!currentUser) {
      throw new Error('No user is currently signed in.');
  }

  return new Promise((resolve, reject) => {
      currentUser?.getUserAttributes((err, attributes) => {
          if (err) {
              reject(err);
          } else {
              resolve(attributes || []);
          }
      });
  });
}

export async function setAttribute(attribute: { Name: string; Value: string }): Promise<any> {
  if (!currentUser) {
      throw new Error('No user is currently signed in.');
  }

  const attributeList: CognitoUserAttribute[] = [
      new CognitoUserAttribute(attribute),
  ];

  return new Promise((resolve, reject) => {
      currentUser?.updateAttributes(attributeList, (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      });
  });
}

export async function sendCode(username: string): Promise<any> {
  const cognitoUser = getCognitoUser(username);

  return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
          onSuccess: (res) => resolve(res),
          onFailure: (err) => reject(err),
      });
  });
}

export async function forgotPassword(
  username: string,
  code: string,
  password: string
): Promise<string> {
  const cognitoUser = getCognitoUser(username);

  return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code, password, {
          onSuccess: () => resolve('Password updated successfully.'),
          onFailure: (err) => reject(err),
      });
  });
}

export async function changePassword(oldPassword: string, newPassword: string): Promise<any> {
  if (!currentUser) {
      throw new Error('No user is currently signed in.');
  }

  return new Promise((resolve, reject) => {
      currentUser.changePassword(oldPassword, newPassword, (err, result) => {
          if (err) {
              reject(err);
          } else {
              resolve(result);
          }
      });
  });
}
