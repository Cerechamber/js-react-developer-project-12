import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import { setChannel } from "../../chatServer";
import { useTranslation } from 'react-i18next';
import { setInitiator } from '../../reducers/channelsReducer';
import { changeBlockSending } from '../../reducers/usersReducer';


 const NewChannel = ({ show, setShow, channels, token, dispatch, blockSending }) => {

  const { t } = useTranslation();

  const validSchema = Yup.object().shape({
    title: Yup.string()
      .required(t('valid.reqField'))
      .min(3, t('valid.min3'))
      .max(20, t('valid.max20'))
      .test({
        test(value, ctx) {
          if (channels.find(c => c.name === value)) {
            return ctx.createError({ message: t('valid.uniqueName') });
          }
          return true
        }
      })
  });

    return (
      <Modal
        data-bs-theme="dark"
        backdrop='static'
        show={ show }
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className='text-white'>
            { t('addChannel') }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
            initialValues={{
              title: '',
            }}
            validationSchema={validSchema}
            onSubmit={(values) => {
              dispatch(changeBlockSending(true));
              dispatch(setInitiator(true));
              setChannel(token, {name: values.title});
              setShow(false);
            }}
            >
              {({values, errors, touched, handleChange, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                      name="title"
                      type="text"
                      value={values.title}
                      onChange={handleChange}
                      isInvalid={errors.title && touched.title}
                      isValid={!errors.title && touched.title}
                      autoFocus
                    />
                    <Form.Control.Feedback type="invalid">
                       {errors.title}
                    </Form.Control.Feedback>
                <div className='d-flex justify-content-end mt-3'>
                <Button onClick={() => setShow(false)} className='btn-dark me-2'>{ t('cancel') }</Button>
                <Button type="submit" 
                  className='btn-info'
                  disabled={!blockSending ? false : true}
                >
                  { t('send') }
                </Button>
                </div>
                </Form>
              )}
            </Formik>
        </Modal.Body>
      </Modal>
    );
  }

  export default NewChannel;