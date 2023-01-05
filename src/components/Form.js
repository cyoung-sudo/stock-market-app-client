import "./Form.css";

export default function Form(props) {
  return (
    <form id="form" onSubmit={e => props.handleSubmit(e)}>
      <div className="form-group">
        <input 
          type="text" 
          placeholder="ticker"
          onChange={e => props.setTicker(e.target.value)}/>
      </div>

      <div className="form-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};