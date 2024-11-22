import React from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, 'Минимум 5 символа')
      .max(25, 'Максимум 25 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(2, 'Минимум 2 символа')
      .max(50, 'Максимум 50 символов')
      .required('Обязательное поле')
  });
  
  const Login = () => {
    return (
        <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          password: '',
          sku: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={ (values) => {
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <Field name="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
    )
    
};

export default Login;