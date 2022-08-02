type SignValidationProps = {
  email?: string | null
  password?: string | null
  passwordConfirm?: string | null
  newPassword?: string | null
}

const emailValidation = (email) => {
  const regexrEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/

  let message: string | null = null

  if (email === '') {
    message = '이메일이 입력되지 않았습니다.'
  } else if (!regexrEmail.test(email)) {
    message = '올바른 이메일 주소를 입력하세요.'
  }

  return message
}

const passwordValidation = (password) => {
  const regexrNumber = /[0-9]/
  const regexrLower = /[a-z]/
  const regexrUpper = /[A-Z]/
  const regexrSpecial = /[~!@#$%^&*()_+|<>?:{}]/

  let message: string | null = null

  if (password === '') {
    message = '비밀번호가 입력되지 않았습니다.'
  } else if (password && password.length < 6) {
    message = '6자 이상 이여야 합니다.'
  } else if (!regexrNumber.test(password)) {
    message = '1개 이상의 숫자를 포함 하여야 합니다.'
  } else if (!regexrLower.test(password)) {
    message = '1개 이상의 소문자를 포함하여야 합니다.'
  } else if (!regexrUpper.test(password)) {
    message = '1개 이상의 대문자를 포함하여야 합니다.'
  } else if (!regexrSpecial.test(password)) {
    message = '1개 이상의 특수문자를 포함하여야 합니다.'
  }

  return message
}

const passwordConfirmValidation = (password, passwordConfirm) => {
  let message: string | null = null

  if (password !== passwordConfirm) {
    message = '비밀번호와 같지 않습니다.'
  }

  return message
}

const signOnValidation = ({
  email,
  password,
  passwordConfirm,
}: SignValidationProps) => {
  const errors: SignValidationProps = {}

  errors.email = emailValidation(email)
  errors.password = passwordValidation(password)
  errors.passwordConfirm = passwordValidation(passwordConfirm)

  return errors
}

const signInValidation = ({email, password}: SignValidationProps) => {
  const errors: SignValidationProps = {}

  errors.email = emailValidation(email)
  errors.password = passwordValidation(password)
  return errors
}

const updatePasswordValidation = ({
  email,
  newPassword,
  passwordConfirm,
}: SignValidationProps) => {
  const errors: SignValidationProps = {}

  errors.email = emailValidation(email)
  errors.newPassword = passwordValidation(newPassword)
  errors.passwordConfirm = passwordValidation(passwordConfirm)

  return errors
}

export default {signOnValidation, signInValidation, updatePasswordValidation}
