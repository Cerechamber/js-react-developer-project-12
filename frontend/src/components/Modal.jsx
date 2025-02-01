import { Modal, Button, Form } from 'react-bootstrap';
import { Formik } from "formik";
import * as Yup from "yup";

 const SummonModal = ({ show, setShow }) => {
    return (
      <Modal
        backdrop='static'
        show={ show }
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
            initialValues={{
              name: '',
            }}
            onSubmit={(values) => {

            }}
            >
              {({values, handleChange, handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Control
                      name="message"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                    />
                <Button onClick={() => setShow(false)}>Отменить</Button>
                <Button type="submit">Отправить</Button>

                </Form>
              )}

            </Formik>
        </Modal.Body>
      </Modal>
    );
  }

  export default SummonModal;