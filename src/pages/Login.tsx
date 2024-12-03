import React, {useState} from 'react'
import { fetcher } from "../hooks/fetcher.ts";
import { tokenAtom } from "../hooks/atoms.ts";
import { useAtom } from "jotai";

export default function Login() {
  const [token, setToken] = useAtom(tokenAtom);
   const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const _handleChange = (e: React.ChangeEvent) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    if ( !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Server Response:", data);
        fetcher.defaults.headers["Authorization"] = `Bearer ${data.cookie}`
        setToken(data.cookie)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
    return (
    <div>
      <h1>Login</h1>
      <form onSubmit={_handleSubmit} className="flex flex-col p-5 max-w-[500px] text-slate-900">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={_handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={_handleChange}
        />
        <button className="button rounded-sm bg-slate-50 text-slate-900" type="submit">
         Login
        </button>
      </form>
    </div>
  )
}
