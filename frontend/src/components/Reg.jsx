import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(5, 'Минимум 5 символов')
      .max(25, 'Максимум 25 символов')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(8, 'Минимум 8 символов')
      .max(50, 'Максимум 50 символов')
      .required('Обязательное поле')
  });
  /*
  axios.post('/api/v1/login', { username: 'admin111', password: 'admin' }).then((response) => {
    console.log(response.data)
  }).catch(function (error) {
    console.log(error);
  });
  */
  
  const Reg = () => {
    return (
        <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          password: '',
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

export default Reg