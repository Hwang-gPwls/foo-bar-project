type SignValidationProps = {
  email?: string
  password?: string
}

const signValidation = ({email, password}: SignValidationProps) => {
  const errors: SignValidationProps = {}
  debugger
  if (email) {
    errors.email = '이메일이 입력되지 않았습니다.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errors.email = '입력된 이메일이 유효하지 않습니다.'
  }

  if (password === undefined) {
    errors.password = '비밀번호가 입력되지 않았습니다.'
    // eslint-disable-next-line no-magic-numbers
  } else if (password.length < 6) {
    errors.password = '8자 이상의 패스워드를 사용해야 합니다.'
  }

  return errors
}

export default {signValidation}
