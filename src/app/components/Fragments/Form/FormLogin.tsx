import React, { useState } from "react";
import InputForm from "../../Elements/Input/page";
import Button from "../../Elements/Button/page";
import { signIn } from "next-auth/react";
import SpinCircle from "../../Elements/Loading/spinCircle";
import { usePathname, useRouter } from "next/navigation";

const FormLogin = ({ searchParams }: any) => {
  const [modalSuccess, setModalSuccess] = useState("hidden");
  const [forgotPass, setForgotPass] = useState("hidden");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [cursor, setCursor] = useState("");
  const [errLogin, setErrLogin] = useState("hidden");
  const [emailField, setEmailField] = useState("invisible");
  const [passField, setPassField] = useState("invisible");
  const callbackUrl = searchParams?.callbackUrl || "/";
  const { push } = useRouter();
  const pathName = usePathname();
  let className = `w-full text-sm px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-0 focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400  dark:focus:ring-gray-300 dark:border-gray-600 dark:focus:border-gray-200`;
  const forgotPassModal = () => {
    if (forgotPass == "hidden") {
      setModalSuccess("hidden");
      setForgotPass("");
    } else {
      setForgotPass("hidden");
    }
  };
  const handleLogin = async (event: any) => {
    event.preventDefault();

    if (event.currentTarget.text.value == "") {
      setEmailField("");
    } else {
      setEmailField("invisible");
    }
    if (event.currentTarget.password.value == "") {
      setPassField("");
    } else {
      setPassField("invisible");
    }

    if (
      event.currentTarget.password.value !== "" &&
      event.currentTarget.text.value !== ""
    ) {
      setUsernameOrEmail(event.currentTarget.password.value);
      setIsloading(true);

      try {
        const response = await signIn("credentials", {
          redirect: false,
          email: event.currentTarget.text.value,
          password: event.currentTarget.password.value,
          callbackUrl,
        });
        console.log(response);

        if (!response?.error) {
          if (pathName == "/" || errLogin == "") {
            setIsloading(false);
          }
          setErrLogin("hidden");
          push(callbackUrl);
        } else {
          if (pathName == "/" || errLogin == "") {
            setIsloading(false);
          }
          setErrLogin("");
        }
      } catch (err) {
        setIsloading(false);
        console.log(err);
      }
    }
  };
  return (
    <div className="m-2">
      <form
        onSubmit={(event) => handleLogin(event)}
        className="flex flex-col gap-3"
      >
        <InputForm
          className={className}
          label="Email"
          styleLabel="text-white text-sm"
          type="text"
          name="text"
          placeholder="contoh@mail.com"
        />
        <InputForm
          className={className}
          label="Password"
          styleLabel="text-white text-sm"
          type="password"
          name="password"
          placeholder="*********"
          additional={
            <a
              onClick={forgotPassModal}
              type="button"
              style={{ cursor: "pointer" }}
              className="text-sm text-gray-400 underline focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Lupa Kata Sandi?
            </a>
          }
        />
        <Button
          className={`w-full px-3 text-white py-4 bg-teal-800 rounded-md focus:bg-teal-950 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 ${cursor} mt-3`}
          type="submit"
        >
          {isLoading ? (
            <div className="flex justify-center gap-2">
              <SpinCircle size={6} />
              Loading...{" "}
            </div>
          ) : (
            <>Masuk</>
          )}
        </Button>
        <Button
          className={`w-full px-3 text-white py-4 rounded-md bg-teal-800 focus:bg-teal-700 focus:outline-none hover:bg-teal-600 transition duration-500 delay-100 ${cursor} mt-3`}
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          Login With Google
        </Button>
      </form>
    </div>
  );
};

export default FormLogin;
