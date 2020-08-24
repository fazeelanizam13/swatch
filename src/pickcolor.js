import React, { useState, useEffect } from 'react';
import './colorpicker.css';
import { Header, Label } from './home';

export default function PickColor() {
  const [I1, setI1] = useState(331);
  const [I2, setI2] = useState(100);
  const [I3, setI3] = useState(50);

  const [Hex, setHex] = useState('');
  const [HSL, setHSL] = useState('hsl(331, 100%, 50%)');
  const [RGB, setRGB] = useState('rgb(254, 1, 123)');

  useEffect(() => {
    function $(el) {
      return document.getElementById(el);
    }

    var inp1 = $("inp1");
    var inp2 = $("inp2");
    var inp3 = $("inp3");
    var view = $("view");
    var root = document.documentElement;

    var h, s, l;
    h = [];
    s = [];
    l = [];
    
    for (let i = 0; i < 360; i++) {
      h.push("hsl(" + (i + 1) + ", " + 100 + "%, " + 50 + "%)");
    }
    for (let i = 0; i < 100; i++) {
      s.push("hsl(" + I1 + ", " + i + "%, 50%)");
      l.push("hsl(" + I1 + ", 100%, " + i + "%)");
    }

    inp1.style.background = "linear-gradient(to right, " + h.join(", ") + ")";
    inp2.style.background = "linear-gradient(to right, " + s.join(", ") + ")";
    inp3.style.background = "linear-gradient(to right, " + l.join(", ") + ")";

    setHSL("hsl(" + I1 + ", " + I2 + "%, " + I3 + "%)");
    
    root.style.setProperty("--color1", "hsl(" + I1 + ", 100%, 50%)");
    root.style.setProperty("--color2", "hsl(" + I1 + ", " + I2 + "%, 50%)");
    root.style.setProperty("--color3", "hsl(" + I1 + ", 100%, " + I3 + "%)");

    setRGB(window.getComputedStyle(view).backgroundColor);

    var str = RGB;
    
    str = str.replace("rgb", "");
    str = str.replace("(", "");
    str = str.replace(")", "");
    str = str.split(",");

    var hex = [0, 0, 0];

    hex[0] = parseFloat(str[0]).toString(16);
    hex[1] = parseFloat(str[1]).toString(16);
    hex[2] = parseFloat(str[2]).toString(16);
    
    if(hex[0].length < 2) {
      hex[0] = '0' + hex[0];
    }
    if(hex[1].length < 2) {
      hex[1] = '0' + hex[1];
    }
    if(hex[2].length < 2) {
      hex[2] = '0' + hex[2];
    }

    setHex("#" + hex.join(""));
  }, [I1, I2, I3])

  return(
    <>
      <Header 
        label="Pick a Color" 
        labelBack="Back Home" 
        pathBack="/"
        labelNext="Choose"
        pathNext="/colors"
        stateNext={Hex}
      />

      <div id="main">
        <View bgColor={HSL}/>

        <div id="colors">
          <Label label={HSL} />
          
          <Input
            id="inp1" max="360" val={I1} func={(e) => {setI1(e.target.value)}}
          />

          <Input
            id="inp2" max="100" val={I2} func={(e) => {setI2(e.target.value)}}
          />

          <Input
            id="inp3" max="100" val={I3} func={(e) => {setI3(e.target.value)}}
          />

          <Label label={RGB} />
          <Label label={Hex} />
        </div>
      </div>
    </>
  )
}

function Input(props){
  return(
    <input 
      id={props.id}
      max={props.max} 
      value={props.val}
      onChange={props.func} 
      className="inp" 
      type="range" 
      min="0" 
      draggable="false"
    />
  )
}

function View(props){
  let style = {
    backgroundColor: props.bgColor
  }

  return(
    <div id="view" style={style}></div>
  )
}