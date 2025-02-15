import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useSelector } from 'react-redux';
import { setChannels, switchChannel } from "../reducers/channelsReducer";
import { setMessages } from "../reducers/messagesReducer";
import { setMessage } from "../chatServer";
import { numWord } from "../helpers";
import NewChannel from "./Modals/NewChannel";
import EditChannel from "./Modals/EditChannel";
import DeleteChannel from "./Modals/DeleteChannel";

import {
  Button,
  ButtonGroup,
  Dropdown,
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Image
} from "react-bootstrap";
import pank from "../assets/pank.png";
import plus from "../assets/plus.svg";
import arrow from "../assets/arrow.svg";

const Slack = ({dispatch}) => {
  const { activeChannel, channels } = useSelector(state => state.channelsReducer);
  const { messages } = useSelector(state => state.messagesReducer);
  const { username, token } = useSelector(state => state.usersReducer);

  const [newModal, newModalSet] = useState(false);
  const [editModal, editModalSet] = useState(false);
  const [toDelModal, toDelModalSet] = useState(false);
  const [toEditChannel, toEditChannelSet] = useState({title: '', id: ''});
  const [delId, delIdSet] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(setChannels(token));
      dispatch(setMessages(token));
    }
  },[token])

  let activeMessages = [];
  
  if (messages.length) {
     activeMessages = messages.filter(m => m.channelId === activeChannel.id);
  }
  


  return (
    <>
    <Container fluid={true} className="bg-dark bg-gradient h-100 overflow-hidden py-3 py-sm-4 px-0">
      <Row className="justify-content-center shadow-lg h-100 mx-0 mx-sm-4 rounded-3 py-4">
          <Col lg={2} md={3} xs={4} className="h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center px-0 px-sm-2">
            <div className="text-white fs-5 fw-bold channels-title">Каналы</div>
            <Button variant="info" className="btn-group-vertical p-0 p-sm-2 summonModal" onClick={() => newModalSet(true)}>
              <Image src={plus} alt=" " />
            </Button>
          </div>
          <ul id="channel-box" className="nav overflow-auto mt-4 d-block">
            {channels.map((channel, index) => {
                return (
                  <li className="nav-item" key={channel.id}>
                 { channel.removable ?
                  <Dropdown 
                    as={ButtonGroup}
                    className="w-100">
                  <Button
                   variant={channel.id === activeChannel.id ? 'info' : 'outline-info'}
                   className="rounded-0 w-75 text-start border-0"
                   onClick={() => dispatch(switchChannel(channel.id))}
                   >
                    # {channel.name}
                  </Button>
                  <Dropdown.Toggle
                   split variant={channel.id === activeChannel.id ? 'info' : 'outline-info'} id={`drop${index}`}
                   className="rounded-0 text-center border-0 opacity-50"
                    />
                  <Dropdown.Menu>
                    <Dropdown.Item 
                    eventKey="1"
                    onClick={() => {
                      delIdSet(channel.id);
                      toDelModalSet(true);
                     }}
                    >
                      Удалить
                    </Dropdown.Item>
                    <Dropdown.Item
                     eventKey="2"
                     onClick={() => {
                      toEditChannelSet({title: channel.name, id: channel.id});
                      editModalSet(true);
                     }}
                     >
                      Переименовать
                     </Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
                :
                  <Button variant={channel.id === activeChannel.id ? 'info' : 'outline-info'}
                   className="rounded-0 w-100 text-start border-0"
                   onClick={() => dispatch(switchChannel(channel.id))}
                   >
                    # {channel.name}
                  </Button>
                 }
                 </li>
                )
            })}
          </ul>
        </Col>
        <Col lg={7} md={9} xs={8} className="d-flex flex-column h-100">
          <div className="bg-info p-2 p-sm-3">
            <div className="fw-bold"># {activeChannel.name ? activeChannel.name : ''}</div>
            <div>{activeMessages.length ?
             activeMessages.length : ''}
             {activeMessages.length ?
             numWord(activeMessages.length,
              [' сообщений', ' сообщение', ' сообщения']) : ''}
             </div>
          </div>
          <div id="messages-box" className="overflow-auto py-3 px-0 p-sm-4 text-white fs-5 fs-md-6">
            
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
                      placeholder="Введите сообщение..."
                      style={{borderRadius: '0'}}
                      className="rounded-start"
                    />
                    <Button variant="info" type="submit"
                     className="btn-group-vertical"
                     disabled={values.message ? false : true}
                     >
                      <Image src={arrow} />
                    </Button>
                  </InputGroup>
              </Form>
              )}
          </Formik>
        </Col>
        <Col lg={3} className="h-100 d-none d-lg-block">
          <Image src={pank} className="w-100 h-75 object-fit-cover rounded-4" alt=" " />
        </Col>
      </Row>
    </Container>
    
    <NewChannel
     show={newModal}
     setShow={newModalSet}
     username={username}
     channels={channels}
     token={token}
     dispatch={dispatch}
    />

    <EditChannel
     show={editModal}
     setShow={editModalSet}
     channels={channels}
     token={token}
     toEditChannel={toEditChannel}
    />

    <DeleteChannel
     show={toDelModal}
     setShow={toDelModalSet}
     token={token}
     delId={delId}
    />

    </>
  );
};

export default Slack;
