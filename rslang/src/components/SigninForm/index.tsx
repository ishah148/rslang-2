import React, { useEffect, useRef, useState } from "react"
import styles from "./SigninForm.module.scss"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

//redux
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useNavigate } from "react-router-dom"

function SigninForm() {
  const { user, error, pending } = useTypedSelector((state) => state.user)
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { signin, setError } = useActions()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = { email, password }
    signin(formData)
    setError(null)
  }

  useEffect(() => {
    setPassword("")
    setEmail("")
    if (user?.message === "Authenticated") navigate("/")
  }, [user])

  useEffect(() => {
    if (user?.email) setEmail(user.email)

    return () => {
      setError(null)
    }
  }, [])

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h3>Signin form</h3>
      <div>
        <TextField
          fullWidth
          required
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          autoFocus={user?.email ? true : false}
          required
          fullWidth
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit" variant="contained">
        Send
      </Button>
      {pending && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </form>
  )
}
export default SigninForm
