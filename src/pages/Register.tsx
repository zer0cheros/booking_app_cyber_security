import React, { useState } from 'react';

export default function Register() {
  // State to hold form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle input change
  const _handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const _handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { username, email, password } = formData;

    // Make sure all fields have values
    if (!username || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={_handleSubmit} className="flex flex-col p-5 max-w-[500px] text-slate-900">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={_handleChange}
        />
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
          Register
        </button>
      </form>
    </div>
  );
}
