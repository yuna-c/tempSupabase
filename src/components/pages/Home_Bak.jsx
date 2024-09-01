import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

import Footer from '../layouts/Footer'
import Nav from '../layouts/Nav'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext' // 현재 로그인된 사용자 정보를 가져오기 위해 AuthContext 사용

const Home = () => {
  const [myPosts, setMyPosts] = useState([])
  const [otherPosts, setOtherPosts] = useState([])
  const { user } = useAuth() // 현재 로그인된 사용자 정보 가져오기

  useEffect(() => {
    const getBlogs = async () => {
      try {
        let { data, error, status } = await supabase.from('blog').select('*')

        if (error && status !== 406) {
          console.log('error', error)
          throw error
        }

        if (data) {
          const myPosts = data.filter((blog) => blog.user_id === user?.id)
          const otherPosts = data.filter((blog) => blog.user_id !== user?.id)
          setMyPosts(myPosts)
          setOtherPosts(otherPosts)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getBlogs()
  }, [user])

  return (
    <>
      <Nav />
      {/* <!-- Page Header--> */}
      <header className="masthead" style={{ backgroundImage: `url('assets/img/home-bg.jpg')` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="site-heading">
                <h1>Clean Blog</h1>
                <span className="subheading">A Blog Theme by Start Bootstrap</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- Main Content--> */}
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
          <div className="col-md-10 col-lg-8 col-xl-7">
            {/* 섹션 1: 내가 쓴 글 */}
            <h2>My Posts</h2>
            {myPosts.length > 0 ? (
              myPosts.map((blog) => (
                <div key={blog.id}>
                  <div className="post-preview">
                    <Link to={`/singlepost/${blog.id}`}>
                      <h2 className="post-title">{blog.title}</h2>
                      <h3 className="post-subtitle">{blog.description}</h3>
                    </Link>
                  </div>
                  <hr className="my-4" />
                </div>
              ))
            ) : (
              <p>No posts by you available.</p>
            )}

            {/* 섹션 2: 다른 사람이 쓴 글 */}
            <h2>Other Users' Posts</h2>
            {otherPosts.length > 0 ? (
              otherPosts.map((blog) => (
                <div key={blog.id}>
                  <div className="post-preview">
                    <Link to={`/singlepost/${blog.id}`}>
                      <h2 className="post-title">{blog.title}</h2>
                      <h3 className="post-subtitle">{blog.description}</h3>
                    </Link>
                    <p className="post-meta">Posted by Another user</p>
                  </div>
                  <hr className="my-4" />
                </div>
              ))
            ) : (
              <p>No posts by other users available.</p>
            )}

            {/* <!-- Pager--> */}
            <div className="d-flex justify-content-end mb-4">
              <a className="btn btn-primary text-uppercase" href="#!">
                Older Posts →
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
