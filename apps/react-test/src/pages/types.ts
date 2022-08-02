import {DeepRequired, FieldErrorsImpl, FieldValues} from 'react-hook-form'

export interface Inputs {
  description: string
  errors?: FieldErrorsImpl<DeepRequired<FieldValues>>
  id: string
  onChange?: any
  placeholder: string
  pathName?: string
  name: string
  getHasErrors: any
}

export interface Buttons {
  id: string
  path: string
  title: string
}

export interface RestSignUpReq {
  email: string
  newPassword: string
  password: string
}
