/* eslint-disable require-unicode-regexp */
type SignValidationProps = {
  email?: string | null
  newPassword?: string | null
  password?: string | null
  passwordConfirm?: string | null
}

const emailValidation = (email) => {
  const regexrEmail =
    // eslint-disable-next-line prefer-named-capture-group, unicorn/no-unsafe-regex
    /^[\dA-Za-z]([._-]?[\dA-Za-z])*@[\dA-Za-z]([._-]?[\dA-Za-z])*\.[A-Za-z]{2,3}$/

  let message: string | null = null

  if (email === '') {
    message = '이메일이 입력되지 않았습니다.'
  } else if (!regexrEmail.test(email)) {
    message = '올바른 이메일 주소를 입력하세요.'
  }

  return message
}

const passwordValidation = (password) => {
  const regexrNumber = /\d/
  const regexrLower = /[a-z]/
  const regexrUpper = /[A-Z]/
  const regexrSpecial = /[!#$%&()*+:<>?@^_{|}~]/
  const maxLength = 6

  let message: string | null = null

  if (password === '') {
    message = '비밀번호가 입력되지 않았습니다.'
  } else if (password && password.length < maxLength) {
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
  password,
  newPassword,
  passwordConfirm,
}: SignValidationProps) => {
  const errors: SignValidationProps = {}

  errors.password = passwordValidation(password)
  errors.newPassword = passwordValidation(newPassword)
  errors.passwordConfirm = passwordConfirmValidation(
    newPassword,
    passwordConfirm,
  )

  return errors
}

export default {
  passwordConfirmValidation,
  signInValidation,
  signOnValidation,
  updatePasswordValidation,
}
