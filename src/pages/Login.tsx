import React, { useState } from "react";
import { fetcher } from "../hooks/fetcher.ts";
import { tokenAtom } from "../hooks/atoms.ts";
import { useAtom } from "jotai";

export default function Login() {
  const [token, setToken] = useAtom(tokenAtom);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const _handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      alert("Please fill out all fields.");
      return;
    }

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server Response:", data);
        fetcher.defaults.headers["Authorization"] = `Bearer ${data.cookie}`;
        setToken(data.cookie);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-gray-100">
       <div className="absolute inset-0 bg-[url('/hero.webp')] bg-cover bg-center opacity-25"></div>
      <div className="w-full z-10 max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Login to Your Account
        </h1>
        <form onSubmit={_handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={_handleChange}
              className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={_handleChange}
              className="mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <p className="text-xs text-gray-500 text-center mt-4">
          By signing in, you agree to our{" "}
          <a href="/terms" className="text-blue-600 hover:underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
