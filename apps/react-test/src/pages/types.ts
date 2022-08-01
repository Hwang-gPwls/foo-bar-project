import {FieldErrorsImpl, DeepRequired, FieldValues} from 'react-hook-form'

export interface Inputs {
  id: string
  description: string
  placeholder: string
  errors?: FieldErrorsImpl<DeepRequired<FieldValues>>
  onChange?: any
}

export interface Buttons {
  id: string
  path: string
  title: string
}

export interface RestSignUpReq {
  email: string
  password: string
  newPassword: string
}
