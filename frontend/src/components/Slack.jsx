import { useEffect } from "react";
import { Formik } from "formik";
import { actions } from "../reducers/chatReducer";
import { useSelector } from 'react-redux';
import { getChannels, getMessages } from "../chatServer";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Image
} from "react-bootstrap";
import pank from "../assets/pank.png";
import plus from "../assets/plus.svg"
import arrow from "../assets/arrow.svg"

const Slack = ({dispatch, token}) => {
  const chat = useSelector(state => state.chatReducer);
  console.log(chat);
  useEffect(() => {
    const channelsData = async () => {
      const data = await getChannels(token);
      //console.log(data);
      dispatch(actions.setChannels(data));
    }
    channelsData();

    const messagesData = async () => {
      const data = await getMessages(token);
      //console.log(data);
      dispatch(actions.setMessages(data));
    }
    messagesData();
  },[])
  return (
    <Container fluid={true} className="bg-dark bg-gradient h-100 overflow-hidden py-3 py-sm-4 px-0">
      <Row className="justify-content-center shadow-lg h-100 mx-0 mx-sm-4 rounded-3 py-4">
          <Col lg={2} md={3} xs={4} className="h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center px-0 px-sm-2">
            <div className="text-white fs-5 fw-bold channels-title">Каналы</div>
            <Button variant="info" className="btn-group-vertical p-0 p-sm-2">
              <Image src={plus} alt=" " />
            </Button>
          </div>
          <ul id="channel-box" className="nav overflow-auto mt-4 d-block">
            {chat.channels.map(channel => {
              return (
                <li className="nav-item" key={channel.id} data-removable={channel.removable}>
                  <Button variant={channel.id === chat.activeChannel ? 'info' : 'outline-info'}
                   className="rounded-0 w-100 text-start border-0"
                   onClick={() => dispatch(actions.setActiveChannel(channel.id))}
                   >
                    # {channel.name}
                  </Button>
                </li>
              )
            })}
          </ul>
        </Col>
        <Col lg={7} md={9} xs={8} className="d-flex flex-column h-100">
          <div className="bg-info p-2 p-sm-3">
            <div className="fw-bold"># general</div>
            <div>7 сообщений</div>
          </div>
          <div id="messages-box" className="overflow-auto py-3 px-0 p-sm-4 text-white fs-5 fs-md-6">
            
            {/*chat.messages.map(message => {
                return (
                  <div className="text-break mb-3" key={message.id}>
                    <span className="fw-bold">{message.username}</span>:
                    <span className="ms-2">{message.body}</span>
                  </div>
                )
            })*/}

          </div>

          <Formik
           initialValues={{
            message: "",
          }}
          onSubmit={(values) => {
            console.log(values,666);
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
  );
};

export default Slack;
