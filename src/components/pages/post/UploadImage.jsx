import { useState } from 'react'
import { supabase } from '../../../supabaseClient'

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  const uploadImage = async (event) => {
    try {
      setUploading(true)

      const file = event.target.files[0]
      if (!file) throw new Error('No file selected')

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `public/${fileName}`

      let { error: uploadError } = await supabase.storage.from('blogimage').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // 업로드 후 URL 가져오기
      const { publicURL, error: urlError } = supabase.storage.from('blogimage').getPublicUrl(filePath)

      if (urlError) {
        throw urlError
      }

      setImageUrl(publicURL) // 이미지 URL을 상태에 저장
    } catch (error) {
      console.error('Error uploading image:', error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <h1>Upload Image to blogimage bucket</h1>
      <input type="file" accept="image/*" onChange={uploadImage} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" />
          <p>
            Image URL: <a href={imageUrl}>{imageUrl}</a>
          </p>
        </div>
      )}
    </div>
  )
}

export default UploadImage
