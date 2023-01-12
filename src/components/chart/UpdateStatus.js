import "./UpdateStatus.css";
// Icons
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FiRefreshCw } from "react-icons/fi";

export default function UpdateStatus(props) {
  return (
    <div 
      data-testid="updateStatus"
      id="updateStatus">
      {props.updated &&
        <div id="updateStatus-updated"><span><BsFillCheckCircleFill/></span>Updated</div>
      }
      {!props.updated && 
        <button 
          id="updateStatus-outdated"
          onClick={() => props.setRefresh(state => !state)}>
          <span><FiRefreshCw/></span>Update Needed
        </button>
      }
    </div>
  );
};