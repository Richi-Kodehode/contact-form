import React, { useState } from "react";

const API_ACCESS_KEY = import.meta.env.API_ACCESS_KEY;

export default function ContactForm() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    formData.append("access_key", API_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message Sent");
        event.target.reset();
      } else {
        console.error("Error:", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Failed to send message");
    }
  };

  return (
    <section className="min-h-screen flex justify-center bg-gray-300">
      <div className="mt-20">
        <div className="bg-gray-100 min-w-80 h-150 border-1 rounded-2xl shadow-2xl md:max-w-130">
          <h3 className="mt-5 text-center font-bold text-2xl">Contact</h3>
          <form
            className="flex m-5 flex-col gap-2 items-center"
            onSubmit={onSubmit}
          >
            <input
              placeholder="Name"
              className="w-80 p-2 text-1xl bg-gray-300 placeholder:text-center placeholder-opacity-50 rounded-2xl md:w-100"
              type="text"
              name="name"
              required
            />
            <input
              placeholder="Email"
              className="w-80 p-2 bg-gray-300 text-1xl placeholder:text-center placeholder-opacity-50 rounded-2xl md:w-100"
              type="email"
              name="email"
              required
            />
            <input
              placeholder="Phone"
              className="w-80 p-2 bg-gray-300 text-1xl placeholder:text-center placeholder-opacity-50 rounded-2xl md:w-100"
              type="text"
              name="phone"
              required
            />
            <textarea
              placeholder="Message"
              className="bg-gray-300 p-2 w-80 h-80 text-1xl placeholder:text-center placeholder-opacity-50 rounded-2xl md:w-100"
              name="message"
              required
            ></textarea>

            <button
              className="text-2xl bg-gray-400 rounded-2xl w-50 hover:bg-gray-200 cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
          <span>{result}</span>
        </div>
      </div>
    </section>
  );
}
