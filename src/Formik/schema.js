import * as yup from 'yup';

export const signinSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .email('Email must be a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const signupSchema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup
      .string()
      .trim()
      .email('Email must be a valid email')
      .required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .email('Email must be a valid email')
      .required('Email is required'),
  })
  .required();

export const updateProfileSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .email('Email must be a valid email')
      .required('Email is required'),
    name: yup.string().trim().required('Name is required'),
    password: yup.string().trim().required('Password is required'),
  })
  .required();
