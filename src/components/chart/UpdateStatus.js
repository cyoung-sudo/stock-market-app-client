import "./UpdateStatus.css";

export default function UpdateStatus(props) {
  return (
    <div id="updateStatus">
      {props.updated &&
        <div>Updated</div>
      }
      {!props.updated && 
        <button onClick={() => props.setRefresh(state => !state)}>Update Needed</button>
      }
    </div>
  );
};