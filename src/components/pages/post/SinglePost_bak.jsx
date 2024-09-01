import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { supabase } from '../../../supabaseClient'

import Nav from '../../layouts/Nav'
import Footer from '../../layouts/Footer'

const SinglePost = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const { user } = useAuth()
  const [author, setAuthor] = useState(null)

  useEffect(() => {
    const getPost = async () => {
      try {
        // 포스트 데이터 가져오기
        let { data: postData, error: postError, status } = await supabase.from('blog').select('*').eq('id', id).single()

        if (postError && status !== 406) {
          console.log('error', postError)
          throw postError
        }
        setPost(postData)

        console.log(`data=> `, typeof data) // 데이터
        console.log(`Image=> `, typeof data[0]?.image) // 첫 번째 데이터의 이미지 URL

        // 작성자 정보 가져오기
        if (postData && postData.user_id) {
          let { data: userData, error: userError } = await supabase
            .from('users') // 여기에 실제 작성자 정보를 저장하는 테이블 이름을 사용하세요.
            .select('email') // 가져오려는 사용자 정보 필드 (예: email)
            .eq('id', postData.user_id)
            .single()

          if (userError) {
            console.log('User fetch error:', userError)
          } else {
            setAuthor(userData)
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    getPost()
  }, [id])

  return (
    <>
      <Nav />
      <header className="masthead" style={{ backgroundImage: `url('/assets/img/post-bg.jpg')` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>{post?.title}</h1>
                <span className="meta">Posted on {new Date(post?.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              {post ? (
                <>
                  <p>{post.content}</p>
                  {post.image && <img src={post.image} alt="Post" className="img-fluid" />}
                  {/* <p>Author: {author?.email}</p> */}
                  <p>Current User: {user?.email}</p>
                </>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}

export default SinglePost
