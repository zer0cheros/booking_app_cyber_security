import React from 'react'

export default function Register() {
  return (
    <div>
        <h1>Register</h1>
        <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Register</button>
        </form>
    </div>
  )
}