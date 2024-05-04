"use client";
import React, { useState } from "react";

const FormSendEbook = () => {
  const [notif, setNotif] = useState(false);
  const [notifSuccess, setNotifSuccess] = useState(false);
  const [message, setMessage] = useState("");
  let valueEmail = "";
  const [emailTo, setEmailTo] = useState("");
  const classNameInput =
    "text-md text-white rounded-lg  w-full p-2.5 bg-black/20 border-2 border-white  backdrop-blur-sm  py-2 px-3 placeholder:text-white";
  const handleSendEbook = async (event: any) => {
    let skuNotFound;
    setNotif(false);
    event.preventDefault();
    const email = event.currentTarget.email.value as string;
    const name = event.currentTarget.name.value as string;
    const sku = event.currentTarget.sku.value as string;
    setEmailTo(email);

    const sendEmailTo = await fetch("/api/seller/sendEbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer token`,
      },
      body: JSON.stringify({
        subject: "E-Book",
        nameFrom: "Baret Store",
        sendFrom: "storebaret@gmail.com",
        password: "rlxp oaut tzvh qwcz",
        nameTo: name,
        sendTo: email,
        sku,
      }),
    });

    const data = await sendEmailTo.json();

    if (sendEmailTo.status == 200) {
      setNotif(true);
      setNotifSuccess(true);
    } else {
      setMessage(data.message);
      setNotif(true);
      setNotifSuccess(false);
    }
  };
  return (
    <div className="flex flex-col gap-5 w-96  ">
      <form
        onSubmit={(e) => handleSendEbook(e)}
        className="bg-gray-700/50  rounded-lg backdrop-blur-sm p-7 "
      >
        <div>
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-white">
              Customer Name
            </label>
            <input
              type="text"
              id="name"
              className={classNameInput}
              placeholder="(Opsional)"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-white">
              Customer Email
            </label>
            <input
              type="email"
              id="email"
              className={classNameInput}
              placeholder="example@mail.com"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-md font-medium text-white">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              className={`${classNameInput} `}
              placeholder="Tuliskan No. SKU"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Send E-Book
          </button>
        </div>
      </form>
      <div>
        {!notif ? (
          <></>
        ) : (
          <>
            {notifSuccess ? (
              <div className="text-sm bg-green-500 p-2 rounded-lg">
                Successfully
                <br />
                Send E-Book to: {emailTo}
              </div>
            ) : (
              <div className="my-2 text-sm bg-red-500 p-2 rounded-lg">
                Failed
                <br />
                {message}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FormSendEbook;
