import React from 'react';
import { Link } from 'react-router-dom';

function Button(props) {
  let buttonStyle = {
    backgroundColor: props.bg,
    color: 'white',
    padding: '15px',
    margin: '5px',
    fontSize: '.9em',
    textAlign: 'center'
  }

  return(
    <Link 
      to={{
        pathname: props.path,
        state: props.state,
      }} 
      style={buttonStyle}
      id={props.id}
    >
      {props.label}
    </Link>
  )
}

function Label(props){
  let style = {
    //backgroundColor: '#ccc',
    textAlign: 'center'
  }

  return(
    <p style={style}>{props.label}</p>
  )
}

function Header(props) {
  let style1 = {
    backgroundColor: '#000',
    width: '100vw',
    height: '10vh',
    padding: '1vh 0',
    textAlign: 'center',
    position: 'fixed',
    top: 0,
    color: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  return(
    <div style={style1}>
      <Button label={props.labelBack} path={props.pathBack} state={props.stateBack} />
      <div>{props.label}</div>
      <Button label={props.labelNext} path={props.pathNext} state={props.stateNext} />
    </div>
  )
}

export default function Home(){
  let style1 ={
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
  }

  let style2 = {
    //backgroundColor: '#ccc',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    height: '40%'
  }

  return(
      <div style={style1}>
        <div className="welcomeMessage">To get started, choose what u want to do:</div>

        <div style={style2}>
          <Button label="Pick a Color" path="/pickcolor" bg={'#4d1f78'} />
          <Button label="Create a Color Palette" path="/createcolorpalette" bg={'#c35353'} />
          <Button label="Go to Swatches" path="/colors" bg={'#4d1f78'} />
          <Button label="Go to Palettes" path="/palettes" bg={'#c35353'} />
        </div>
      </div>
  );
}

export { Button, Header, Label }