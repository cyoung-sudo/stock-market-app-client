import "./Form.css";

export default function Form(props) {
  return (
    <form 
      data-testid="form"
      id="form"
      onSubmit={e => props.handleSubmit(e)}>
      <div className="form-group">
        <input
          data-testid="form-input"
          type="text" 
          placeholder="ticker"
          onChange={e => props.setTicker(e.target.value)}/>
      </div>

      <div className="form-submit">
        <input 
          data-testid="form-submit"
          type="submit"
          value="Submit"/>
      </div>
    </form>
  );
};