// ejected using 'npx eject-keycloak-page'
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../kcContext";
import type { I18n } from "../i18n";
import btnGoogle from "../assets/btn_google.svg";
import iconBack from "../assets/icon_back.svg";
import React, { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import pollenOriginalLogo from "../assets/pollen-icon-origin.svg";

export default function Register(
  props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>
) {
  const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

  const { getClassName } = useGetClassName({
    doUseDefaultCss,
    classes,
  });

  const {
    url,
    messagesPerField,
    register,
    passwordRequired,
    recaptchaRequired,
    recaptchaSiteKey,
  } = kcContext;

  const { msg, msgStr } = i18n;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleConfirmPasswordVisibility() {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  }

  // useAuth
  // State to hold the value of the input field
  const [phoneInputValue, setPhoneInputValue] = useState("");

  return (
    <Template
      {...{ kcContext, i18n, doUseDefaultCss, classes }}
      headerNode={""}
    >
      {" "}
      <div className="flex mb-10 justify-between items-center">
        <div className="block">
          <a
            href={url.loginUrl}
            className="inline-flex w-full justify-start text-center items-center py-2.5 px-5 me-2 mb-2 focus:outline-none bg-white rounded-lg hover:bg-gray-100"
          >
            <img
              alt="Back"
              src={iconBack}
              style={{ width: "10px" }}
              className="mr-4"
            />
            <p
              className="font-normal text-gray-500"
              style={{ fontSize: "14px" }}
            >
              Back to Login
            </p>
          </a>
        </div>
      </div>
      <div className="flex-container">
        <div className="p-0 m-0">
          <img alt="Pollen Logo" src={pollenOriginalLogo} />
        </div>
        <div className="notif-content pt-2">
          <b className="subtext !text-gray-900 font-bold notif-content-title">
            Get exclusive access to the latest Pollen Direct liquidation
            inventory catalogs
          </b>
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
          Enter your information
        </p>
      </div>
      <form
        id="kc-register-form"
        className="registration-form"
        action={url.registrationAction}
        method="post"
      >
        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "firstName",
              getClassName("kcFormGroupErrorClass")
            ),
            "input_header"
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="firstName" className={getClassName("kcLabelClass")}>
              {msg("firstName")}
            </label>
            <span className="subtitle">
              <span className="required">*</span>
            </span>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input
              type="text"
              id="firstName"
              className={getClassName("kcInputClass")}
              name="firstName"
              defaultValue={register.formData.firstName ?? ""}
              placeholder="Eg. Kevin"
              required
            />
          </div>
        </div>

        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "lastName",
              getClassName("kcFormGroupErrorClass")
            ),
            "input_header"
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="lastName" className={getClassName("kcLabelClass")}>
              {msg("lastName")}
            </label>
            <span className="subtitle">
              <span className="required">*</span>
            </span>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input
              type="text"
              id="lastName"
              className={getClassName("kcInputClass")}
              name="lastName"
              defaultValue={register.formData.lastName ?? ""}
              placeholder="Eg. King"
              required
            />
          </div>
        </div>

        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "email",
              getClassName("kcFormGroupErrorClass")
            ),
            "input_header"
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label htmlFor="email" className={getClassName("kcLabelClass")}>
              {msg("email")}
            </label>
            <span className="subtitle">
              <span className="required">*</span>
            </span>
          </div>
          <div className={getClassName("kcInputWrapperClass")}>
            <input
              id="email"
              className={getClassName("kcInputClass")}
              name="email"
              defaultValue={register.formData.email ?? ""}
              autoComplete="email"
              required
            />
            <p className="font-normal pt-2">Please input your company email</p>
          </div>
        </div>

        <div
          className={clsx(
            getClassName("kcFormGroupClass"),
            messagesPerField.printIfExists(
              "phoneNumber",
              getClassName("kcFormGroupErrorClass")
            ),
            "input_header clear-both"
          )}
        >
          <div className={getClassName("kcLabelWrapperClass")}>
            <label
              htmlFor="user.attributes.phone"
              className={getClassName("kcLabelClass")}
            >
              {msg("phoneNumber")}
            </label>
            <span className="subtitle">
              <span className="required">*</span>
            </span>
          </div>
          <div
            className={clsx(
              getClassName("kcInputWrapperClass"),
              "w-full mx-auto"
            )}
          >
            <PhoneInput
              required
              defaultCountry="us"
              style={{ height: "55px" }}
              onChange={(phone) => setPhoneInputValue(phone)}
            />
            <input
              type="hidden"
              id="user.attributes.phone"
              name="user.attributes.phone"
              value={phoneInputValue}
            />
          </div>
        </div>

        {passwordRequired && (
          <>
            <div
              className={clsx(
                getClassName("kcFormGroupClass"),
                messagesPerField.printIfExists(
                  "password",
                  getClassName("kcFormGroupErrorClass")
                ),
                "input_header"
              )}
            >
              <div className={getClassName("kcLabelWrapperClass")}>
                <label
                  htmlFor="password"
                  className={getClassName("kcLabelClass")}
                >
                  {msg("password")}
                </label>
                <span className="subtitle">
                  <span className="required">*</span>
                </span>
              </div>
              <div className={getClassName("kcInputWrapperClass")}>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  className={getClassName("kcInputClass")}
                  name="password"
                  autoComplete="new-password"
                  required
                />
                <span className="password " onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div
                className={clsx(
                  getClassName("kcFormGroupClass"),
                  messagesPerField.printIfExists(
                    "password-confirm",
                    getClassName("kcFormGroupErrorClass")
                  ),
                  "input_header"
                )}
              >
                <div className={getClassName("kcLabelWrapperClass")}>
                  <label
                    htmlFor="password-confirm"
                    className={getClassName("kcLabelClass")}
                  >
                    {msg("passwordConfirm")}
                  </label>
                  <span className="subtitle">
                    <span className="required">*</span>
                  </span>
                </div>
                <div className={getClassName("kcInputWrapperClass")}>
                  <input
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    id="password-confirm"
                    className={getClassName("kcInputClass")}
                    name="password-confirm"
                    required
                  />
                  <span
                    className="password"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {isConfirmPasswordVisible ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}

        <div
          className="kcFormGroupClass clear-both rounded-md "
          style={{ padding: "0 20px" }}
        >
          <div className="block p-6 bg-gray-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5
              className="mb-4 text-2xl font-medium tracking-tight text-gray-800 dark:text-white"
              style={{ fontSize: "14px" }}
            >
              Password security starts with creating a strong password. Your
              password must contain:
            </h5>
            <ul
              className="font-normal text-gray-700 list-disc pl-4"
              style={{ fontSize: "12px" }}
            >
              <li className="pb-3">At least 8 characters</li>
              <li className="pb-3">Lower case letters (a-z)</li>
              <li className="pb-3">Upper case letters (A-Z)</li>
              <li className="pb-3">Numbers (0-9)</li>
              <li className="pb-3">Special characters (e.g. !@#$%^&*)</li>
            </ul>
          </div>
        </div>

        {recaptchaRequired && (
          <div className="form-group">
            <div className={getClassName("kcInputWrapperClass")}>
              <div
                className="g-recaptcha"
                data-size="compact"
                data-sitekey={recaptchaSiteKey}
              ></div>
            </div>
          </div>
        )}
        <div className={getClassName("kcFormGroupClass")}>
          <div
            id="kc-form-buttons"
            className={getClassName("kcFormButtonsClass")}
          >
            <input
              className={`btn btn--pollen bg-[#CEADF5] hover:bg-white hover:text-[#CEADF5] hover:border-[#E5E7EB] `}
              type="submit"
              value={msgStr("doRegister")}
            />
          </div>

          <div className="relative flex py-5 items-center justify-center text-center m-auto text-2xl  w-9/12">
            <div className="flex-grow border-t border-[#D7D7D7]"></div>
            <span className="flex-shrink mx-4 text-gray-900">OR</span>
            <div className="flex-grow border-t border-[#D7D7D7]"></div>
          </div>
          <div
            id="kc-form-buttons"
            className="kcFormButtonsClass col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center inline-flex items-center !mt-0"
          >
            <button
              type="button"
              className="btn btn--google text-gray-700 bg-[#FFF] hover:bg-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-center inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mb-2 col-xs-12 col-sm-12 col-md-12 col-lg-12"
              style={{ padding: "8px 20px" }}
            >
              <img src={btnGoogle} className="pr-2" />
              Continue With Google
            </button>
          </div>
        </div>
      </form>
    </Template>
  );
}
