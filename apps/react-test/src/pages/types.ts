import {DeepRequired, FieldErrorsImpl, FieldValues} from 'react-hook-form'

export interface Inputs {
  description: string
  errors?: FieldErrorsImpl<DeepRequired<FieldValues>>
  getHasErrors: any
  id: string
  name: string
  onChange?: any
  pathName?: string
  placeholder: string
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
