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
    const publicURL = await getUrl(filePath)
    setImage(publicURL)

    // 이미지 URL이 설정된 후에 addBlog 함수 호출
    addBlog({ title, description, content, image: publicURL })
  } catch (error) {
    alert(error.message)
  } finally {
    setUploading(false)
  }
}

const getUrl = async (url) => {
  try {
    const { publicURL, error } = await supabase.storage.from('blogimage').getPublicUrl(url)
    if (error) throw error
    console.log(publicURL)
    return publicURL // URL을 반환합니다
  } catch (error) {
    alert(error.message)
  }
}

const handleSubmit = async (e) => {
  e.preventDefault()
  if (!image) {
    alert('Please upload an image first.')
    return
  }
  // 이제 이미지 업로드 후 addBlog가 실행되므로 따로 호출하지 않아도 됩니다.
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
            <form onSubmit={handleSubmit}>
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
              <button type="submit" disabled={uploading} className="btn btn-lg btn-secondary btn-block">
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
