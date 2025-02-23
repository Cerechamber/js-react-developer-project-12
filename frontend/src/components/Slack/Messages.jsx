import { useServer } from "../../contexts/ChatProvider";
import { useTranslation } from 'react-i18next';
import { Formik } from "formik";
import { useSelector } from 'react-redux';
import { changeBlockSending } from "../../reducers/usersReducer";
import arrow from "../../assets/arrow.svg";
import {
    Button,
    Col,
    Form,
    InputGroup,
    Image
  } from "react-bootstrap";

const Messages = ({ dispatch, activeChannel, username, token, blockSending }) => {
    const { messages } = useSelector(state => state.messagesReducer);
    let activeMessages = [];
    if (messages.length) {
       activeMessages = messages.filter(m => m.channelId === activeChannel.id);
    }
    const { setMessage } = useServer();
    const { t } = useTranslation();
    return (
        <Col lg={7} md={9} xs={8} className="d-flex flex-column h-100">
          <div className="bg-info p-2 p-sm-3">
            <div className="fw-bold"># {activeChannel.name ? activeChannel.name : ''}</div>
            <div>
             { t('key', { count: activeMessages.length }) }
             </div>
          </div>
          <div id="messages-box" className="overflow-auto py-3 px-0 p-sm-4 text-white fs-5 fs-md-6 mb-3">
            {activeMessages.length ?
              activeMessages.map(message => {
                return (
                  <div className="text-break mb-3" key={message.id}>
                    <span className={message.username === username ? 'fw-bold text-info-emphasis' : 'fw-bold' }>{message.username}</span>:
                    <span className="ms-2">{message.body}</span>
                  </div>
                )
            }) : null }

          </div>

          <Formik
           initialValues={{
            message: "",
          }}
          onSubmit={(values) => {
            dispatch(changeBlockSending(true));
            const nxtMessage = {
              body: values.message,
              channelId: activeChannel.id,
              username: username,
             };
             setMessage(token, nxtMessage);
             values.message = '';
          }}
          >
            {({values, handleChange, handleSubmit}) =>  (
                <Form onSubmit={handleSubmit} className="mt-auto form-chat">
                  <InputGroup className="has-validation">
                    <Form.Control
                      name="message"
                      type="text"
                      value={values.message}
                      onChange={handleChange}
                      placeholder={ t('writeSmth') }
                      style={{borderRadius: '0'}}
                      className="rounded-start"
                    />
                    <Button variant="info" type="submit"
                     className="btn-group-vertical"
                     disabled={values.message && !blockSending ? false : true}
                     >
                      <Image src={arrow} />
                    </Button>
                  </InputGroup>
              </Form>
              )}
          </Formik>
        </Col>
    )
}

export default Messages;