import { useState, type FormEventHandler } from "react";
import { clsx } from "keycloakify/tools/clsx";
import { useConstCallback } from "keycloakify/tools/useConstCallback";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import btnGoogle from "../assets/btn_google.svg";
import pollenOriginalLogo from "../assets/pollen-icon-origin.svg";

const my_custom_param = new URL(window.location.href).searchParams.get(
  "my_custom_param"
);

if (my_custom_param !== null) {
  console.log("my_custom_param:", my_custom_param);
}

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    social,
    realm,
    url,
    usernameHidden,
    login,
    auth,
    registrationDisabled,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>((e) => {
    e.preventDefault();

    setIsLoginButtonDisabled(true);

    const formElement = e.target as HTMLFormElement;

    //NOTE: Even if we login with email Keycloak expect username and password in
    //the POST request.
    formElement
      .querySelector("input[name='email']")
      ?.setAttribute("name", "username");

    formElement.submit();
  });

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayInfo={
        realm.password && realm.registrationAllowed && !registrationDisabled
      }
      displayWide={realm.password && social.providers !== undefined}
      headerNode={""}
      infoNode={
        <div id="kc-registration">
          <span>
            {msg("noAccount")}
            <a
              className="login__link-text"
              tabIndex={6}
              href={url.registrationUrl}
            >
              {msg("doRegister")}
            </a>
          </span>
        </div>
      }
    >
      <div className="flex-container">
        <div className="p-0 m-0">
          <img alt="Pollen Logo" src={pollenOriginalLogo} />
        </div>
        <div className="notif-content  pt-2">
          <p className="subtext !text-gray-900 font-extrabold notif-content-title">
            Get exclusive access to the latest Pollen Direct liquidation
            inventory catalogs
          </p>
          <p className="subtext !text-gray-900 notif-content-description">
            Sign up for free to view catalogs featuring millions of liquidation
            stock, and make your bulk purchase offers direct to global
            manufacturers.{" "}
          </p>
        </div>
      </div>

      <div>
        <p
          className="titletext font-bold text-center !text-gray-900 mt-20 mb-10"
          style={{
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "-0.48px",
          }}
        >
          Login
        </p>
      </div>
      <div
        className="text-center kc-registration"
        style={{ marginBottom: "15px" }}
      >
        Login to your Pollen Pass account
      </div>
      <div id="kc-form" className="login-form">
        {/* headerDescription={"Login to your Pollen Pass account"} */}
        <div
          id="kc-form-wrapper"
          className={clsx(
            realm.password &&
              social.providers && [
                getClassName("kcFormSocialAccountContentClass"),
                getClassName("kcFormSocialAccountClass"),
              ]
          )}
        >
          {realm.password && (
            <form
              id="kc-form-login"
              onSubmit={onSubmit}
              action={url.loginAction}
              method="post"
            >
              <div className={getClassName("kcFormGroupClass")}>
                {!usernameHidden &&
                  (() => {
                    const label = !realm.loginWithEmailAllowed
                      ? "username"
                      : realm.registrationEmailAsUsername
                      ? "email"
                      : "usernameOrEmail";

                    const autoCompleteHelper: typeof label =
                      label === "usernameOrEmail" ? "username" : label;

                    return (
                      <>
                        <label
                          htmlFor={autoCompleteHelper}
                          className={getClassName("kcLabelClass")}
                        >
                          {msg(label)}
                        </label>
                        <input
                          tabIndex={1}
                          id={autoCompleteHelper}
                          className={getClassName("kcInputClass")}
                          //NOTE: This is used by Google Chrome auto fill so we use it to tell
                          //the browser how to pre fill the form but before submit we put it back
                          //to username because it is what keycloak expects.
                          name={autoCompleteHelper}
                          defaultValue={login.username ?? ""}
                          type="text"
                          autoFocus={true}
                          autoComplete="off"
                        />
                      </>
                    );
                  })()}
              </div>
              <div className={getClassName("kcFormGroupClass")}>
                <label
                  htmlFor="password"
                  className={getClassName("kcLabelClass")}
                >
                  {msg("password")}
                </label>
                <input
                  tabIndex={2}
                  id="password"
                  className={getClassName("kcInputClass")}
                  name="password"
                  type="password"
                  autoComplete="off"
                />
              </div>
              <div
                className={clsx(
                  getClassName("kcFormGroupClass"),
                  getClassName("kcFormSettingClass")
                )}
              >
                <div className={getClassName("kcFormOptionsWrapperClass")}>
                  {realm.resetPasswordAllowed && (
                    <span>
                      <a
                        className="login__link-text"
                        tabIndex={5}
                        href={url.loginResetCredentialsUrl}
                      >
                        {msg("doForgotPassword")}
                      </a>
                    </span>
                  )}
                </div>
                <div id="kc-form-options">
                  {realm.rememberMe && !usernameHidden && (
                    <div className="checkbox">
                      <label>
                        <input
                          tabIndex={3}
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          {...(login.rememberMe === "on"
                            ? {
                                checked: true,
                              }
                            : {})}
                        />
                        {msg("rememberMe")}
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div
                id="kc-form-buttons"
                className={getClassName("kcFormGroupClass")}
              >
                <input
                  type="hidden"
                  id="id-hidden-input"
                  name="credentialId"
                  {...(auth?.selectedCredential !== undefined
                    ? {
                        value: auth.selectedCredential,
                      }
                    : {})}
                />
                <input
                  tabIndex={4}
                  className={clsx(
                    getClassName("kcButtonClass"),
                    getClassName("kcButtonPrimaryClass"),
                    getClassName("kcButtonBlockClass"),
                    getClassName("kcButtonLargeClass")
                  )}
                  name="login"
                  id="kc-login"
                  type="submit"
                  value={msgStr("doLogInSubmit")}
                  disabled={isLoginButtonDisabled}
                />
              </div>
            </form>
          )}
        </div>

        {realm.password && social.providers !== undefined && (
          <>
            {social.providers.map((p) => (
              <div>
                <hr className="hr-text gradient" data-content="OR" />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    textAlign: "center",
                  }}
                >
                  <a
                    href={p.loginUrl}
                    id={`zocial-${p.alias}`}
                    className="btn-social default"
                    style={{ padding: "8px 20px", marginTop: "16px" }}
                  >
                    <img alt="google" src={btnGoogle} className="pr-2" />
                    Continue With Google
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Template>
  );
}
