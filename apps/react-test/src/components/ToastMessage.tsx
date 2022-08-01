import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface toastMessageProps {
  status: string
  page: string
}

export const ToastMessage: FC<toastMessageProps> = ({
  status,
  page,
}: toastMessageProps) => {
  console.log(`call toast`)
  if (status === '401' && page === 'signUp') {
    toast.error('이미 가입된 사용자 입니다.', {
      autoClose: 3000,
      position: toast.POSITION.TOP_CENTER,
    })
  }
  return <ToastContainer />
}
