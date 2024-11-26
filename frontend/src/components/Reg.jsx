import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

 const passwordMatch = /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/;

const SignupSchema = Yup.object().shape({
  nick: Yup.string().required('Обязательное поле')
    .min(4, 'Минимум 4 символа')
    .max(25, 'Максимум 25 символов'),
  password: Yup.string()
    .min(8, 'Минимум 8 символов').required('Обязательное поле')
    .max(32, 'Максимум 32 символов')
    .matches(passwordMatch, 'Введите корректный пароль'),
    passwordConfirm: Yup.string().required('Обязательное поле')
    .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
});

const Reg = ({ dispatch, setUser }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Регистрация</h1>
      <Formik
        initialValues={{
          nick: "",
          password: "",
          passwordConfirm: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          axios.post('/api/v1/signup',
            { username: values.nick, password: values.password })
            .then(({ data }) => {
              dispatch(setUser(data));
              localStorage.setItem('userToken', data.token);
              localStorage.setItem('userName', data.username);
              navigate('/', { replace: false });
          });
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="nick" />
            {errors.nick && touched.nick ? (
              <div>{errors.nick}</div>
            ) : null}
            <Field name="password" type="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
            <Field name="passwordConfirm" type="password" />
            {errors.passwordConfirm && touched.passwordConfirm ? (
              <div>{errors.passwordConfirm}</div>
            ) : null}
            <button type="submit">Submit</button>
            <div>Пароль должен содержать как минимум 1 букву нижнего регистра, минимум 1 заглавную букву, не менее 1 числа, как минимум 1 специальный символ(!#%). Только латиница.</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Reg;
