import { useState, useEffect } from 'react'
import { supabase } from '../../supabaseClient'

import Footer from '../layouts/Footer'
import Nav from '../layouts/Nav'
import { Link } from 'react-router-dom'

const Home = () => {
  const [data, setData] = useState()
  useEffect(() => {
    const getBlogs = async () => {
      try {
        let { data, error, status } = await supabase.from('blog').select('*')

        if (error && status !== 406) {
          console.log('error', error)
          throw error
        }
        console.log(data)
        setData(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getBlogs()
  }, [])

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
            {data
              ? data.map((blog) => {
                  return (
                    <div key={blog.id}>
                      {/* <!-- Post preview--> */}
                      <div className="post-preview">
                        <Link to={`/singlepost/${blog.id}`}>
                          <h2 className="post-title">{blog.title}</h2>
                          <h3 className="post-subtitle">{blog.description}</h3>
                        </Link>
                        {/* <p className="post-meta">
                          Posted by
                          <a href="#!">Start Bootstrap</a>
                          on September 24, 2023
                        </p> */}
                      </div>
                      {/* <!-- Divider--> */}
                      <hr className="my-4" />
                    </div>
                  )
                })
              : ''}

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
