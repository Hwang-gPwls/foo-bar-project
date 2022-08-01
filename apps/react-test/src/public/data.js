const inputSignIn = [
  {
    id: 'email',
    description: '이메일을 입력하세요',
    placeholder: 'Email',
  },
  {
    id: 'password',
    description:
      '6글자이상 1개 이상 기호 포함 대소문자 숫자 1개 이상 포함 패스워드를 입력하세요',
    placeholder: 'Password',
  },
]

const inputSignUp = [
  {
    id: 'email',
    description: '이메일을 입력하세요',
    placeholder: 'Email',
  },
  {
    id: 'password',
    description:
      '6글자이상 1개 이상 기호 포함 대소문자 숫자 1개 이상 포함 패스워드를 입력하세요',
    placeholder: 'Password',
  },
  {
    id: 'passwordConfirm',
    description: '확인을 위해 한번더 입력해 주세요',
    placeholder: 'Write your password again',
  },
]

const inputPassword = [
  {
    id: 'password',
    description: '기존 패스워드를 입력하세요',
    placeholder: 'Password',
  },
  {
    id: 'newPassword',
    description:
      '6글자 이상 1개 이상 기호 포함 대소문자 숫자 1개 이상 포함 패스워드를 입력하세요',
    placeholder: 'New Password',
  },
  {
    id: 'newPasswordCinfirm',
    description: '다시 한 번 패스워드를 입력해주세요',
    placeholder: 'New Password',
  },
]

const buttonLogOut = [
  {id: 'signIn', title: 'SIGN IN', path: '/sign-in'},
  {id: 'signUp', title: 'SIGN UP', path: '/sign-up'},
]

const buttonLogIn = [
  {id: 'signOut', title: 'SIGN OUT', path: '/'},
  {id: 'password', title: 'UPDATE PASSWORD', path: '/password'},
]

export default {
  inputSignIn,
  inputSignUp,
  inputPassword,
  buttonLogIn,
  buttonLogOut,
}
