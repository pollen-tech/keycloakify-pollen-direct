import { createUseI18n } from "keycloakify/login";

export const { useI18n } = createUseI18n({
  // NOTE: Here you can override the default i18n messages
  // or define new ones that, for example, you would have
  // defined in the Keycloak admin UI for UserProfile
  // https://user-images.githubusercontent.com/6702424/182050652-522b6fe6-8ee5-49df-aca3-dba2d33f24a5.png
  en: {
    alphanumericalCharsOnly: "Only alphanumerical characters",
    gender: "Gender",
    // Here we overwrite the default english value for the message "doForgotPassword"
    // that is "Forgot Password?" see: https://github.com/InseeFrLab/keycloakify/blob/f0ae5ea908e0aa42391af323b6d5e2fd371af851/src/lib/i18n/generated_messages/18.0.1/login/en.ts#L17
    doForgotPassword: "Forgot Password",
    invalidUserMessage:
      "Invalid username or password. (this message was overwrite in the theme)",
    noAccount: "Want to access Pollen Direct?",
    doRegister: "Sign Up with Pollen Pass",
    goGoogle: "Continue with Google",
    doLogInSubmit: "Sign In",
    doLogIn: "Login",
    emailForgotTitle: "Forgot Password",
    backToLogin: "Back to Login",
    doContinue: "Continue",
  },
  fr: {
    /* spell-checker: disable */
    alphanumericalCharsOnly: "Caractère alphanumérique uniquement",
    gender: "Genre",
    doForgotPassword: "Forgot Password",
    invalidUserMessage:
      "Nom d'utilisateur ou mot de passe invalide. (ce message a été écrasé dans le thème)",
    noAccount: "Want to access Pollen Direct?",
    doRegister: "Sign Up with Pollen Pass",
    goGoogle: "Continue with Google",
    doLogInSubmit: "Sign In",
    doLogIn: "Login",
    emailForgotTitle: "Forgot Password",
    backToLogin: "Back to Login",
    doContinue: "Continue",
  },
});

export type I18n = NonNullable<ReturnType<typeof useI18n>>;
