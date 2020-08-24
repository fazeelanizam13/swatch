import React, { useState, useEffect } from 'react';
import { Header } from './home';
import deleteIcon from './ic_delete_black_48dp.png';

export default function Palettes(props){
  const [Palettes, setPalettes] = useState([]);

  useEffect(() => {
    let json = localStorage.getItem('palettesStored');
    let array = JSON.parse(json);

    if(props.location.state){
      const base = props.location.state.base;
      const accent = props.location.state.accent;
      const colors = [base, '#424242', '#fafafa', '#fff', accent];
      
      let svgNS = 'http://www.w3.org/2000/svg';
      let svg = document.createElementNS(svgNS, 'svg');

      function drawSVG(colors){
        for(let i = 0; i < 5; i++){
          let rect = document.createElementNS(svgNS, 'rect');
          
          let x = i*20
          
          rect.setAttribute('fill', colors[i]);
          rect.setAttribute('width', '20%');
          rect.setAttribute('height', '100%');
          rect.setAttribute('x', (x.toString() + '%'));
          rect.setAttribute('y', '0');
          
          svg.appendChild(rect);
        }
        
        let rectOverlay = document.createElementNS(svgNS, 'rect');
        rectOverlay.setAttribute('fill', base);
        rectOverlay.setAttribute('width', '40%');
        rectOverlay.setAttribute('height', '100%');
        rectOverlay.setAttribute('x', '20%');
        rectOverlay.setAttribute('y', '0');
        rectOverlay.setAttribute('style', 'mix-blend-mode: overlay; opacity: 40%');
        
        svg.appendChild(rectOverlay);
      }

      drawSVG(colors);

      let canvas = document.createElement('canvas');
      document.body.appendChild(canvas)
      let context = canvas.getContext('2d');
      let svgURL = new XMLSerializer().serializeToString(svg);
      let img  = new Image();

      img.onload = function(){
        context.drawImage(img, 0, 0);
      
        let imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        let darkGreyR = imageData.data[.3*canvas.width*4];
        let darkGreyG = imageData.data[.3*canvas.width*4 + 1];
        let darkGreyB = imageData.data[.3*canvas.width*4 + 2];

        let lightGreyR = imageData.data[.5*canvas.width*4];
        let lightGreyG = imageData.data[.5*canvas.width*4 + 1];
        let lightGreyB = imageData.data[.5*canvas.width*4 + 2];

        let darkGrey = 'rgb(' + darkGreyR + ',' + darkGreyG + ',' + darkGreyB + ')';
        let lightGrey = 'rgb(' + lightGreyR + ',' + lightGreyG + ',' + lightGreyB + ')';

        let newP = [base, darkGrey, lightGrey, '#fff', accent];

        if(array){
          for(let i = 0; i < array.length; i++){
            if((array[i][0] === newP[0]) && (array[i][4] === newP[4])){
              alert('You have saved that palette! Surely it is in here somewhere.');
              array.reverse();
              setPalettes(array);
              newP = null;
              break;
            }
          }

          if(newP !== null){
            array.reverse();
            array.push(newP);
            array.reverse();
            setPalettes(array);
          }
          
          let newJSON = JSON.stringify(array);
          localStorage.setItem('palettesStored', newJSON);
        }
        else{
          let arb = []
          arb.push(newP);
          setPalettes(arb);

          let newJSON = JSON.stringify(arb);
          localStorage.setItem('palettesStored', newJSON);
        }
      }
      
      img.src = 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgURL);

      document.body.removeChild(canvas)
    }
    else{
      setPalettes(array);
    }
  }, []);

  function deletePalette(indexToDelete){
    let remainingPalettes = [...Palettes].filter(
      (palette, index) => index !== indexToDelete
    );
    setPalettes(remainingPalettes);
    let newJSON = JSON.stringify(remainingPalettes);
    localStorage.setItem('palettesStored', newJSON);
  };

  function copyPalette(indexToCopy){
    let array = [...Palettes].filter(
      (palette, index) => index === indexToCopy 
    );

    let textToCopy = 'base: ' + array[0][0] + '\n' + 
                      'dark grey: ' + array[0][1] + '\n' + 
                      'light grey: ' + array[0][2] + '\n' + 
                      'background: ' + array[0][3] + '\n' + 
                      'accent: ' + array[0][4];

    let dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = textToCopy;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    alert('You selected: \n\n' + textToCopy)
  }

  return(
    <>
      <Header 
        label="Your Palettes" 
        labelBack="Go Home" 
        pathBack="/"
        labelNext="Add New"
        pathNext="/createcolorpalette"
      />

      <div className="palettes" style={{
        width: '90%',
        height: '70vh',
        top: '30vh'
      }}>
        {
          Palettes.map(
            (palette, index) => { 
              return <Palette 
                        key={index} 
                        palette={palette} 
                        deleteFunc={() => {deletePalette(index)}} 
                        copyFunc={() => {copyPalette(index)}}
                      />
            }
          )
        }
      </div>
    </>
  )
}

function Palette(props){
  let palette = props.palette;

  let style = {
    float: 'left',
    width: '400px',
    height: '50px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return(
    <div className="palette" style={style}>
      {
        palette.map(
          (col, i) => { 
            return <div 
                    key={i} 
                    style={{ 
                      width: '20%', 
                      height: '100%', 
                      backgroundColor: col }}
                    onClick={props.copyFunc}>
                  </div> 
          }
        )
      }
      <img 
        src={deleteIcon} 
        alt="delete-note" 
        onClick={props.deleteFunc}
        style={{width: '35px'}}
        className="delete"
      />
    </div>
  )
}