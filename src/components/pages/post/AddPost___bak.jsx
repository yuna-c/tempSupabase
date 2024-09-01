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
  const [imagePath, setImagePath] = useState(null)
  const [uploading, setUploading] = useState(false)

  let navigate = useNavigate()

  // 이미지 업로드 함수
  const uploadImage = async (e) => {
    try {
      setUploading(true)
      // 파일 선택 여부 확인
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('업로드할 이미지를 선택해야 합니다')
      }

      const file = e.target.files[0] // 파일 가져오기
      const fileExt = file.name.split('.').pop() // 확장자 추출
      const fileName = `${Math.random()}.${fileExt}` // 랜덤 파일명 생성
      const filePath = `public/${fileName}` // 파일 경로 생성

      let { data, error: uploadError } = await supabase.storage.from('blogimage').upload(filePath, file)

      if (uploadError) throw uploadError

      console.log('업로드된 데이터 로그:', data) // 업로드된 데이터 로그
      console.log(filePath)
      setImagePath(filePath) // 이미지 경로 저장
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  // 블로그 글 올리기
  const addBlog = async ({ title, description, content, imagePath }) => {
    try {
      const updates = {
        id: uuidv4(),
        title: title,
        description: description,
        content: content,
        image: imagePath // 이미지 경로 저장
      }

      let { error } = await supabase.from('blog').insert(updates)

      if (error) throw error // 오류발생한 경우 사용자에게 던짐

      navigate('/') // 업로드 후 메인 페이지로 이동
    } catch (error) {
      alert(error.message)
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
                  onClick={() => addBlog({ title, description, content, imagePath })}
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
