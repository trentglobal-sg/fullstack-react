/*
  A React Component follows the same rules below
  1. Is a function
  2. The first alphabet is a upper case alphabet
  3. Return JSX
  4. Recieves parameter via an object known as props (optional)
     - The first parameter of a component is known as the props
     - props is an object
     - we can pass data via props (each parameter is a key/value pair in props)
*/
function Message(props) {
  return <div style={{
    padding:"10px",
    margin:"10px",
    border:"1px solid black",
    color: props.color
  }}>{props.message}</div>
}

export default Message;