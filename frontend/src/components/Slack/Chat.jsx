import { useEffect } from "react";
import { setChannels } from "../../reducers/channelsReducer";
import { setMessages } from "../../reducers/messagesReducer";
import { changeBlockSending } from "../../reducers/usersReducer";
import { useSelector } from 'react-redux';
import Messages from "./Messages";
import Channels from "./Channels";
import pank from "../../assets/pank.png";
import {
  Row,
  Col,
  Container,
  Image
} from "react-bootstrap";

const Chat = ({dispatch}) => {
  const { activeChannel, firstLoadChannels } = useSelector(state => state.channelsReducer);
  const { firstLoadMessages } = useSelector(state => state.messagesReducer);
  const { username, token, blockSending } = useSelector(state => state.usersReducer);
  useEffect(() => {
    if (token) {
      dispatch(setChannels(token));
      dispatch(setMessages(token));
    }
  },[token])

  useEffect(() => {
    if (firstLoadChannels && firstLoadMessages) {
      dispatch(changeBlockSending(false));
    }
  },[firstLoadChannels, firstLoadMessages]);

  return (
    <>
    <Container fluid={true} className="bg-dark bg-gradient h-100 overflow-hidden py-3 py-sm-4 px-0">
      <Row className="justify-content-center shadow-lg h-100 mx-0 mx-sm-4 rounded-3 py-4">
      <Channels
       activeChannel={activeChannel}
       dispatch={dispatch}
       username={username}
       token={token}
       blockSending={blockSending}
      />

      <Messages
       dispatch={dispatch}
       activeChannel={activeChannel}
       username={username}
       token={token}
       blockSending={blockSending}
      />
      <Col lg={3} className="h-100 d-none d-lg-block">
          <Image src={pank} className="w-100 h-75 object-fit-cover rounded-4" alt=" " />
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Chat;
