import { useEffect, useRef } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { removeChannel } from "../../chatServer";
import { useTranslation } from 'react-i18next';
import { changeBlockSending } from '../../reducers/usersReducer';

 const DeleteChannel = ({ show, setShow, token, dispatch, delId, blockSending }) => {

  const { t } = useTranslation();
  
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
          { t('deleteChannel') }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    dispatch(changeBlockSending(true));
                    removeChannel(token, delId);
                    setShow(false);
                }}>
                   <Alert variant='dark' className='fs-5'>
                    { t('sure') } 
                  </Alert>
                    
                <div className='d-flex justify-content-end mt-3'>
                <Button onClick={() => setShow(false)} className='btn-dark me-2'>{ t('cancel') }</Button>
                <Button type="submit"
                 className='btn-danger'
                 ref={delButton}
                 disabled={!blockSending ? false : true}
                 >
                { t('delete') }
                </Button>
                </div>
                </Form>
        </Modal.Body>
      </Modal>
    );
  }

  export default DeleteChannel;