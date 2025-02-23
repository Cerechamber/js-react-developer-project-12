import { useEffect, useRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";
import { useServer } from "../../../contexts/ChatProvider";
import { useTranslation } from 'react-i18next';
import { changeBlockSending } from '../../../reducers/usersReducer';


 const EditChannel = ({ show, setShow, channels, token, dispatch, toEditChannel, blockSending }) => {
  const { t } = useTranslation();

  const { editChannel } = useServer();

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
    const inputRef = useRef(null);

  useEffect(() => {
    if (show && inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
    }
}, [show]);

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
            { t('renameChannel') }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
            initialValues={{
              title: toEditChannel.title,
            }}
            validationSchema={validSchema}
            onSubmit={(values) => {
              dispatch(changeBlockSending(true));
              editChannel(token, {name: values.title}, toEditChannel.id);
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
                      ref={inputRef}
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

  export default EditChannel;