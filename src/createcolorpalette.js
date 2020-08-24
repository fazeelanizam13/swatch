import React, { useState, useEffect } from 'react';
import { Header } from './home';
import $ from 'jquery';

export default function CreateColorPalette(){
  const [Swatches, setSwatches] = useState([]);
  const [Base, setBase] = useState('#30c9e8');
  const [Accent, setAccent] = useState('#ff4431');
  const [Selecting, setSelecting] = useState('base');

  useEffect(() => {
    let json = localStorage.getItem('colorsStored');
    let array = JSON.parse(json);
    
    if(array[0]){
      array.reverse();
      setSwatches(array);
    }else{
      alert('You do not have any swatches saved.\nYou need to pick a few colors first and come back 8[');
    }
  }, []);

  useEffect(() => {
    $('.chosenBase').css('backgroundColor', Base);
    $('.chosenAccent').css('backgroundColor', Accent);
    $('.chooseBase').css('borderColor', Base);
    $('.chooseAccent').css('borderColor', Accent);
  }, [Base, Accent]);

  useEffect(() => {
    $('.showSwatches').click(function(){
      $('.swatches').slideDown(200);
    });

    $('.swatch').click(function(){
      $('.swatches').slideUp(200)
    })
  });

  useEffect(() => {
  })

  let mainStyle = {
    width: '90%',
    height: '70vh',
    top: '30vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //border: '1px #000 solid'
  }

  let buttonDivStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '20px 0',
    padding: '20px 0',
    //border: '1px #000 solid',
  }

  let buttonsStyle = {
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: '#fff',
    fontSize: '.9em',
    padding: '15px',
    margin: '5px',
    textAlign: 'center',
  }

  let colorsStyle = {
    width: '96%',
    //border: '1px #000 solid',
    padding: '2%',
    display: 'none'
  }

  let sampleStyle = { width: '40px', height: '40px', margin: '10px'}

  let style1 = { display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }

  return(
    <>
      <Header 
        label="Create a Palette" 
        labelBack="Add More to Swatches" 
        pathBack="/pickcolor"
        labelNext="Create Palette"
        pathNext="/palettes"
        stateNext={{base: Base, accent: Accent}}
      />

      <div style={mainStyle}>
        <div style={buttonDivStyle}>
          <div style={style1}>
            <button style={buttonsStyle} onClick={() => { setSelecting('base'); }} className="showSwatches chooseBase">
              Choose a Base Color
            </button>
            <div className="chosenBase" style={sampleStyle}></div>
          </div>

          <div style={style1}>
            <button style={buttonsStyle} onClick={() => { setSelecting('accent'); }} className="showSwatches chooseAccent">
              Choose an Accent Color
            </button>
            <div className="chosenAccent" style={sampleStyle}></div>
          </div>
        </div>

        <div className="swatches" style={colorsStyle}>
          {Swatches.map((swatch, index) => {
              return(
                <div className="swatch" key={index}
                  style={{
                    float: 'left',
                    width: '50px',
                    height: '50px',
                    margin: '7px',
                    backgroundColor: swatch,
                  }}
                  onClick={() => {
                    if(Selecting === 'base'){ setBase(swatch); }
                    else{ setAccent(swatch); }
                  }}
                ></div>
              )
          })}
        </div>
      </div>
    </>
  )
}