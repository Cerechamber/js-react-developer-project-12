
import { useState } from "react";
import { switchChannel } from "../../reducers/channelsReducer";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import NewChannel from "./Modals/NewChannel";
import EditChannel from "./Modals/EditChannel";
import DeleteChannel from "./Modals/DeleteChannel";
import plus from "../../assets/plus.svg";
import {
    Button,
    ButtonGroup,
    Dropdown,
    Col,
    Image
  } from "react-bootstrap";

const Channels = ({ dispatch, activeChannel, username, token, blockSending }) => {
    const { channels } = useSelector(state => state.channelsReducer);
    const [newModal, newModalSet] = useState(false);
    const [editModal, editModalSet] = useState(false);
    const [toDelModal, toDelModalSet] = useState(false);
    const [toEditChannel, toEditChannelSet] = useState({title: '', id: ''});
    const [delId, delIdSet] = useState('');
    const { t } = useTranslation();
    return (
        <Col lg={2} md={3} xs={4} className="h-100 d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center px-0 px-sm-2">
            <div className="text-white fs-5 fw-bold channels-title">{ t('channels') }</div>
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
                      { t('delete') }
                    </Dropdown.Item>
                    <Dropdown.Item
                     eventKey="2"
                     onClick={() => {
                      toEditChannelSet({title: channel.name, id: channel.id});
                      editModalSet(true);
                     }}
                     >
                      { t('rename') }
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
          <NewChannel
     show={newModal}
     setShow={newModalSet}
     username={username}
     channels={channels}
     token={token}
     dispatch={dispatch}
     blockSending={blockSending}
    />

    <EditChannel
     show={editModal}
     setShow={editModalSet}
     channels={channels}
     token={token}
     dispatch={dispatch}
     toEditChannel={toEditChannel}
     blockSending={blockSending}
    />

    <DeleteChannel
     show={toDelModal}
     setShow={toDelModalSet}
     token={token}
     dispatch={dispatch}
     delId={delId}
     blockSending={blockSending}
    />
        </Col>
    )
}

export default Channels;