import React, { useState, useEffect } from 'react';
import { Header, Label } from './home';
import deleteIcon from './ic_delete_black_48dp.png';

export default function Swatches(props){
  const [Swatches, setSwatches] = useState([]);

  useEffect(() => {
    let json = localStorage.getItem('colorsStored');
    let array = JSON.parse(json);

    if(props.location.state){
      if(array){
        for(let i = 0; i < array.length; i++){
          if(array[i] === props.location.state){
            alert(props.location.state + ' is already on the palette! Pick a different color?')
            setSwatches(array);
            props.location.state = null;
            break;
          }
        }

        if(props.location.state !== null){
          array.reverse();
          array.push(props.location.state);
          array.reverse();
          setSwatches(array);
        }
        
        let newJSON = JSON.stringify(array);
        localStorage.setItem('colorsStored', newJSON);
      }
      else{
        let arb = []
        arb.push(props.location.state);
        setSwatches(arb);
        let newJSON = JSON.stringify(arb);
        localStorage.setItem('colorsStored', newJSON);
      }
    }
    else{
      setSwatches(array)
    }
  }, []);

  function deleteSwatch(indexToDelete){
    let remainingSwatches = [...Swatches].filter(
      (swatch, index) => index !== indexToDelete
    );
    setSwatches(remainingSwatches);
    let newJSON = JSON.stringify(remainingSwatches);
    localStorage.setItem('colorsStored', newJSON);
  };

  function copySwatch(indexToCopy){
    let array = [...Swatches].filter(
      (swatch, index) => index === indexToCopy 
    );

    let textToCopy = array[0];

    let dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = textToCopy;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('You selected: ' + textToCopy)
  }

  return(
    <>
      <Header 
        label="Your Swatches" 
        labelNext="Pick New Color" 
        pathNext="/pickcolor"
        labelBack="Go Home"
        pathBack="/"
      />

      <div style={{
        width: '90%',
        height: '70vh',
        top: '30vh'
      }}>
        {
          Swatches.map(
            (swatch, index) => { 
              return <Swatch 
                        key={index} 
                        col={swatch} 
                        deleteFunc={() => {deleteSwatch(index)}} 
                        copyFunc={() => {copySwatch(index)}}
                      />
            }
          )
        }
      </div>
    </>
  )
}

function Swatch(props){
  let style1 = {
    float: 'left',
    width: '100px',
    height: '150px',
    //backgroundColor: '#ddd',
    borderBottom: '1px #ccc solid',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px'
  }

  let style2 ={
    width: '100%',
    height: '70%',
    backgroundColor: props.col,
  }

  let style3 = {
    backgroundColor: props.col,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  }

  return(
    <div style={style1} className="swatch">
      <div style={style3}>
        <img 
          src={deleteIcon} 
          alt="delete-note" 
          onClick={props.deleteFunc}
          className="delete"
        />
      </div>
      <div style={style2} onClick={props.copyFunc}></div>
      <Label label={props.col} />
    </div>
  )
}

