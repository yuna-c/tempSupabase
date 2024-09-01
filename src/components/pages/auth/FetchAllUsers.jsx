import { supabase } from '../../../supabaseClient'

export default function FetchAllUsers() {
  const fetchAllUsers = async () => {
    const { data, error } = await supabase
      .from('users') // 'users'는 당신이 직접 관리하는 유저 테이블의 이름입니다.
      .select('*') // 모든 컬럼을 선택합니다.

    if (error) {
      console.error('Error fetching users:', error)
      return []
    }

    return data
  }

  fetchAllUsers().then((users) => console.log(users))
}
