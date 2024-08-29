import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { supabase } from '../../../supabaseClient'

import Nav from '../../layouts/Nav'
import Footer from '../../layouts/Footer'

const SinglePost = () => {
  let { id } = useParams()
  const [data, setData] = useState()
  const { user } = useAuth()
  // console.log('Current User:', user)

  useEffect(() => {
    const getBlog = async () => {
      try {
        let { data, error, status } = await supabase.from('blog').select('*').eq('id', id)

        if (error && status !== 406) {
          console.log('error', error)
          throw error
        }
        console.log(data)
        setData(data[0])
      } catch (error) {
        console.log(error.message)
      }
    }

    getBlog()
  }, [id]) // id가 변경될 때만 의존성 배열이 실행
  return (
    <>
      <Nav />
      <header className="masthead" style={{ backgroundImage: `url('/assets/img/home-bg.jpg')` }}>
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>{data ? data.title : ''}</h1>
                <h2 className="subheading">{data ? data.description : ''}</h2>
                <span className="meta">
                  Posted by
                  <a href="#!">Start Bootstrap</a>
                  <br />
                  <img
                    style={{ maxWidth: '500px', width: '-webkit-fill-available' }}
                    src={data ? data.image : ''}
                    alt=""
                  />
                  {/* {data && data.image ? <img src={data.image} alt="" /> : 'Loading...'} */}
                  <br />
                  {data ? `1. ${data.created_at.slice(0, 10)} ${data.created_at.slice(11, 19)}` : ''} <br />
                  {data
                    ? (() => {
                        // 날짜와 시간을 분리
                        const datePart = data.created_at.slice(0, 10).replace(/-/g, '/')
                        let timePart = data.created_at.slice(11, 19)

                        // 시간을 12시간 표기법으로 변환
                        let [hours, minutes, seconds] = timePart.split(':')
                        hours = parseInt(hours, 10)
                        const ampm = hours >= 12 ? 'PM' : 'AM'
                        hours = hours % 12 || 12 // 0시를 12시로 변환

                        // 변환된 시간 조합
                        timePart = `${ampm} ${hours}:${minutes}:${seconds}`

                        // 최종 날짜와 시간 형식 반환
                        return `2. ${datePart} ${timePart}`
                      })()
                    : ''}
                  <br />
                  {data
                    ? '3. ' + data.created_at.slice(0, 10).replace(/-/g, '/') + ' ' + data.created_at.slice(11, 19)
                    : ''}
                  <br />
                  <br />
                  {/* id : {id} <br /> */}
                  user : {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              {data
                ? data.content.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : ''}
              <p>
                Placeholder text by
                <a href="http://spaceipsum.com/">Space Ipsum</a>
                &middot; Images by
                <a href="https://www.flickr.com/photos/nasacommons/">NASA on The Commons</a>
              </p>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}
export default SinglePost
