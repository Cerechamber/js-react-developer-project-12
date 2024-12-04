import { useEffect } from "react";
import panks from "../assets/panks.png";
import { getChannels } from "../chatServer";
const Slack = ({dispatch, token}) => {
  useEffect(() => {
    const channelsData = async () => {
      const data = await getChannels(token);
      console.log(data);
    }
    channelsData();
  })
  return (
    <>
      <div>asdf</div>
    </>
  );
};

export default Slack;
