import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import { useState, useEffect } from "react";
import CountdownTimer from "../components/CountdownTimer";

export default function LoginResetPassword(
  props: PageProps<
    Extract<KcContext, { pageId: "login-reset-password.ftl" }>,
    I18n
  >
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const { url, realm, auth } = kcContext;

  const { msg, msgStr } = i18n;

  const [isSentEmail] = useState(false);

  const storedResendTime = JSON.parse(
    localStorage.getItem("resendResetEmailTimerStorage") || "null"
  );

  const [resendTime] = useState(storedResendTime);

  const [isResendLinkEnable] = useState(false);

  const handleResendClick = () => {};

  const handleSubmitClick = () => {};

  useEffect(() => {
    console.log(isSentEmail);
  });

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      displayMessage={false}
      headerNode={""}
      infoNode={msg("emailInstruction")}
    >
      <div className="block">
        <p
          className="titletext font-bold text-center !text-gray-900 my-6"
          style={{
            fontSize: "24px",
            lineHeight: "32px",
            letterSpacing: "-0.48px",
          }}
        >
          {msg("emailForgotTitle")}
        </p>
        {isSentEmail ? (
          <>
            <p
              className="text-gray-500 font-normal text-center mb-4"
              style={{ fontSize: "14px", lineHeight: "20px" }}
            >
              We are sending a reset password link to <br />
              <p>{}</p>
            </p>
            <p
              className="titletext font-semibold text-center !text-gray-900 mt-10 mb-8"
              style={{
                fontSize: "18px",
                lineHeight: "28px",
              }}
            >
              {"buyer email"}
            </p>

            <form
              id="kc-reset-password-form"
              className={clsx(getClassName("kcFormClass"), "login-reset-form")}
              action={url.loginAction}
              method="post"
            >
              <p
                className="text-gray-500 pb-2 text-center"
                style={{ fontSize: "14px", lineHeight: "20px" }}
              >
                Please check your email and click the link to reset your
                password
              </p>
              <p
                className="text-gray-500 pb-2 text-center"
                style={{ fontSize: "14px", lineHeight: "20px" }}
              >
                Haven't received the email?{" "}
                {isResendLinkEnable ? (
                  <a
                    href="#"
                    onClick={handleResendClick}
                    style={{
                      color: "#8431E7",
                    }}
                  >
                    Click here to resend
                  </a>
                ) : (
                  <span>
                    Click to resend in{" "}
                    <span className="text-gray-500 font-semibold">
                      <CountdownTimer
                        minutes={resendTime?.minutes}
                        seconds={resendTime?.seconds}
                      />
                    </span>
                  </span>
                )}
                {/* <span style={{ fontWeight: 700 }}> {JSON.stringify(storedResendTime.minutes + ':' + storedResendTime.seconds) + '- ' + isResendLinkEnable}</span> */}
                {/* <span style={{ fontWeight: 700 }}> {JSON.stringify(resendTime?.minutes + ':' + resendTime?.seconds) + '- ' + isResendLinkEnable}</span> */}
              </p>

              <p
                className="text-gray-500 pb-2 text-center"
                style={{ fontSize: "14px", lineHeight: "20px" }}
              >
                Wrong email{" "}
                <a
                  href="#"
                  style={{
                    color: "#8431E7",
                  }}
                >
                  Go Back
                </a>
              </p>
            </form>
          </>
        ) : (
          <>
            <p
              className="text-gray-500 font-normal text-center mb-4"
              style={{ fontSize: "14px", lineHeight: "20px" }}
            >
              We will send the link to your email to help you reset <br /> your
              password
            </p>

            <form
              id="kc-reset-password-form"
              className={clsx(getClassName("kcFormClass"), "login-reset-form")}
              action={url.loginAction}
              method="post"
            >
              <div className={getClassName("kcFormGroupClass")}>
                <div className={getClassName("kcLabelWrapperClass")}>
                  <label
                    htmlFor="email"
                    className={getClassName("kcLabelClass")}
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: "500",
                    }}
                  >
                    {!realm.loginWithEmailAllowed
                      ? msg("email")
                      : !realm.registrationEmailAsUsername
                      ? msg("usernameOrEmail")
                      : msg("email")}
                  </label>
                </div>
                <div className={getClassName("kcInputWrapperClass")}>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className={getClassName("kcInputClass")}
                    autoFocus
                    defaultValue={
                      auth !== undefined && auth.showUsername
                        ? auth.attemptedUsername
                        : undefined
                    }
                    placeholder="Input your registered email"
                  />
                </div>
              </div>
              <div
                className={clsx(
                  getClassName("kcFormGroupClass"),
                  getClassName("kcFormSettingClass")
                )}
              >
                <div
                  id="kc-form-buttons"
                  className={getClassName("kcFormButtonsClass")}
                  style={{
                    marginTop: "5px",
                  }}
                >
                  <input
                    className={`btn btn--pollen bg-[#8431E7] hover:bg-white hover:text-[#8431E7] hover:border-[#E5E7EB] `}
                    type="submit"
                    value={msgStr("doContinue")}
                  />
                </div>
                <div
                  id="kc-form-options"
                  className={getClassName("kcFormOptionsClass")}
                >
                  <div
                    className={getClassName("kcFormOptionsWrapperClass")}
                    style={{
                      fontSize: "14px",
                      lineHeight: "20px",
                      fontWeight: "400",
                      marginTop: "8px",
                    }}
                  >
                    <span style={{ color: "#6B7280" }}>
                      Back to{" "}
                      <a
                        onClick={handleSubmitClick}
                        href={url.loginUrl}
                        style={{
                          color: "#8431E7",
                        }}
                      >
                        {"Login"}
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </Template>
  );
}
