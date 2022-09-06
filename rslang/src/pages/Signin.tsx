import React from "react"

import { Link } from "react-router-dom"
import SigninForm from "../components/SigninForm"

function Signin() {
  return (
    <div className="auth-form-wrapper">
      <SigninForm />
      <Link className="auth-form-btn" to="/rslang-2/signup">
        Create an account
      </Link>
    </div>
  )
}
export default Signin
