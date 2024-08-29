import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import SignUp from './components/pages/auth/SignUp'
import AddPost from './components/pages/post/AddPost'
import SinglePost from './components/pages/post/SinglePost'

import './App.css'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/addpost" element={<AddPost />} />
            <Route exact path="/singlepost" element={<SinglePost />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
