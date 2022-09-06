import React, { useEffect, useRef, useState } from "react"
import styles from "./SignupForm.module.scss"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

//redux
import { useActions } from "../../hooks/useActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useNavigate } from "react-router-dom"

function SignupForm() {
  const { error, pending, succsess } = useTypedSelector((state) => state.user)
  const navigate = useNavigate()
  const { signup, setSuccess, setError } = useActions()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = { name, email, password }
    signup(formData)
    setError(null)
  }
  
  useEffect(() => {
    if (succsess) {
      setName("")
      setEmail("")
      setPassword("")
      navigate("/rslang-2/signin")
      setSuccess(false)
    }
    return () => {
      setError(null)
    }
  }, [succsess])

  return (
    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
      <h3>Signup form</h3>
      <div>
        <TextField required fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
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
export default SignupForm
