import React from "react"

import { Link } from "react-router-dom"

import SignupForm from "../components/SignupForm"

function Signup() {
  return (
    <div className="auth-form-wrapper">
      <SignupForm />
      <Link className="auth-form-btn" to="/signin">
        I already have an account
      </Link>
    </div>
  )
}
export default Signup
