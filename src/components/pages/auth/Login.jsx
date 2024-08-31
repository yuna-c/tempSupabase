import { useAuth } from '../../../context/AuthContext'
import { useRef, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState(null)
  const [message, setMessage] = useState('')

  const { signIn } = useAuth() // useAuth를 함수로 호출해야 함
  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const { error } = await signIn({ email, password })

    if (error) {
      setError(error)
      setMessage('error with email or password')
      return
    }

    navigate('/')
    window.location.reload()
  }

  return (
    <div className="text-center div Login">
      <form className="form-signin" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          ref={emailRef}
          type="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          required
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          ref={passwordRef}
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          로그인
        </button>
        <Link className="btn btn-lg btn-success btn-block" to="/signup">
          회원가입
        </Link>
      </form>
      {message ? alert(message) : ''}
    </div>
  )
}
export default Login
