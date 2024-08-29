import { useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

import Nav from '../../layouts/Nav'
import Footer from '../../layouts/Footer'

const AddPost = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)

  let navigate = useNavigate()

  // 블로그 글 올리기
  const addBlog = async ({ title, description, content, image }) => {
    try {
      const updates = {
        id: uuidv4(),
        title: title,
        description: description,
        content: content,
        image: image
      }

      let { error } = await supabase.from('blog').insert(updates).then(navigate('/'))
      if (error) throw error // 오류발생한 경우 사용자에게 던짐
    } catch (error) {
      alert(error.message)
    } finally {
    }
  }

  // storage 저장소에 추가 /이미지 초기 업로드 세팅
  const uploadImage = async (e) => {
    try {
      setUploading(true)
      // 이미지 업로드 에러
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload')
      }

      const file = e.target.files[0] // 사용자가 추가할 파일 인코딩
      const fileExt = file.name.split('.').pop() // 파일 확장자 추출
      const fileName = `${Math.random()}.${fileExt}` // 랜덤 파일명 생성
      const filePath = `public/${fileName}` // 파일 경로 생성

      let { data, error: uploadError } = await supabase.storage.from('blogimage').upload(filePath, file)

      if (uploadError) throw uploadError

      console.log('Image uploaded:', data) // 업로드된 데이터 로그
      getUrl(filePath)
    } catch (error) {
      alert(error.message)
    }
  }

  // 이미지 업로드 프로세스
  const getUrl = async (url) => {
    try {
      const { publicURL, error } = await supabase.storage.from('blogimage').getPublicUrl(url)
      if (error) throw error
      console.log(publicURL)
      setImage(publicURL)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <Nav />
      <header className="masthead">
        <div className="container position-relative px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <div className="post-heading">
                <h1>AddPost</h1>
              </div>
            </div>
          </div>
        </div>
      </header>
      <article className="mb-4">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-md-10 col-lg-8 col-xl-7">
              <form onSubmit={(e) => e.preventDefault()}>
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Post title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="title"
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Short description</label>
                    <input
                      value={description}
                      placeholder="description"
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Post content</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="content"
                      className="form-control"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-3 pb-1">
                    <label className="form-label px-0">Post image</label>
                    <input accept="image/*" onChange={uploadImage} type="file" className="form-control" />
                  </div>
                </div>
                <button
                  onClick={() => addBlog({ title, description, content, image })}
                  disabled={uploading}
                  className="btn btn-lg btn-secondary btn-block"
                  type="submit"
                >
                  {uploading ? 'uploading...' : 'Add'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}
export default AddPost
