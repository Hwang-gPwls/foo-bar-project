const inputSignIn = [
  {
    description: '이메일을 입력하세요',
    id: 'email',
    name: '이메일',
    placeholder: 'Email',
  },
  {
    description:
      '6글자이상 1개 이상 기호 포함 대소문자 숫자 1개 이상 포함 패스워드를 입력하세요',
    id: 'password',
    name: '패스워드',
    placeholder: 'Password',
  },
]

const inputSignUp = [
  {
    description: '이메일을 입력하세요',
    id: 'email',
    name: '이메일',
    placeholder: 'Email',
  },
  {
    description:
      '6글자이상 1개 이상 기호 포함 대소문자 숫자 1개 이상 포함 패스워드를 입력하세요',
    id: 'password',
    name: '패스워드',
    placeholder: 'Password',
  },
  {
    description: '확인을 위해 한번더 입력해 주세요',
    id: 'passwordConfirm',
    name: '패스워드',
    placeholder: 'Write your password again',
  },
]

const inputPassword = [
  {
    description: '기존 패스워드를 입력하세요',
    id: 'password',
    name: '패스워드',
    placeholder: 'Password',
  },
  {
    description:
      '6글자 이상 1개 이상 기호 포함 대소문자 숫자 1개 이상 포함 패스워드를 입력하세요',
    id: 'newPassword',
    name: '패스워드',
    placeholder: 'New Password',
  },
  {
    description: '다시 한 번 패스워드를 입력해주세요',
    id: 'PasswordConfirm',
    name: '패스워드',
    placeholder: 'New Password',
  },
]

const buttonLogOut = [
  {id: 'signIn', path: '/sign-in', title: 'SIGN IN'},
  {id: 'signUp', path: '/sign-up', title: 'SIGN UP'},
]

const buttonLogIn = [
  {id: 'signOut', path: '/', title: 'SIGN OUT'},
  {id: 'password', path: '/password', title: 'UPDATE PASSWORD'},
]

const errorMessages = [
  {code: '401', message: '잘못된 비밀번호 입니다.', path: 'sign-in'},
  {code: '404', message: '존재하지 않는 계정입니다', path: 'sign-in'},
  {code: '409', message: '이미 회원가입 하셨습니다.', path: 'sign-up'},
  {
    code: '401',
    message: '기존 비밀번호를 잘못 입력하셨습니다.',
    path: 'password',
  },
]

export default {
  buttonLogIn,
  buttonLogOut,
  errorMessages,
  inputPassword,
  inputSignIn,
  inputSignUp,
}
