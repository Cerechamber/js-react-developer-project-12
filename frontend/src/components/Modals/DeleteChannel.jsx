import { useEffect, useRef } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { removeChannel } from "../../chatServer";

 const DeleteChannel = ({ show, setShow, token, delId }) => {
  
  const delButton = useRef(null);

  useEffect(() => {
    const onKeyDown = e => {
        if(e.keyCode === 13 && delButton.current) {
            delButton.current.click();
        }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
        document.removeEventListener('keydown', onKeyDown);
    };
}, []);

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
          Удалить канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    removeChannel(token, delId);
                    setShow(false);
                }}>
                   <Alert variant='dark' className='fs-5'>
                    Уверены? 
                  </Alert>
                    
                <div className='d-flex justify-content-end mt-3'>
                <Button onClick={() => setShow(false)} className='btn-dark me-2'>Отменить</Button>
                <Button type="submit" className='btn-danger' ref={delButton}>Удалить</Button>
                </div>
                </Form>
        </Modal.Body>
      </Modal>
    );
  }

  export default DeleteChannel;