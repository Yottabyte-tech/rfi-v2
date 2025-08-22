import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function Redo() {
  const [xVal, setXVal] = useState(200);
  const [yVal, setYVal] = useState(200);
  const [imageTxt, setImageTxt] = useState("0 0 255 0 255 1 0 0 255 0");
  const [imageS, setImageS] = useState([]);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    const newImageS = imageTxt.split(" ").map(Number);
    setImageS(newImageS);
  }, [imageTxt]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext("2d");
    }
    const ctx = ctxRef.current;
    canvas.width = xVal;
    canvas.height = yVal;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < imageS.length; i += 5) {
      const x = imageS[i];
      const y = imageS[i + 1];
      const r = imageS[i + 2];
      const g = imageS[i + 3];
      const b = imageS[i + 4];
      const pixelIndex = (y * canvas.width + x) * 4;
      if (pixelIndex >= 0 && pixelIndex < data.length) {
        data[pixelIndex] = r;
        data[pixelIndex + 1] = g;
        data[pixelIndex + 2] = b;
        data[pixelIndex + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }, [imageS, xVal, yVal]);

  return (
    <>
      <h1 className="title">RFI Image Format Converter</h1>
      <div id="canvas">
        <canvas ref={canvasRef} style={{ border: '1px solid gray' }}>
          Your browser does not support Canvas
        </canvas>
      </div>
      <div id="XDiv">
        <input
          type="number"
          min="2"
          max="1200"
          id="X"
          value={xVal}
          onChange={(e) => setXVal(Number(e.target.value))}
          className="submit"
        />
      </div>
      <div id="YDiv">
        <input
          type="number"
          min="2"
          max="510"
          id="Y"
          value={yVal}
          onChange={(e) => setYVal(Number(e.target.value))}
          className="submit"
        />
        <button onClick={() => {}} className="inputCoo">
          Input Dimensions
        </button>
      </div>
      <div id="InputImage">
        <textarea
          id="ImageTXT"
          name="ImageTXT"
          rows="6"
          cols="75"
          value={imageTxt}
          onChange={(e) => setImageTxt(e.target.value)}
          className="inputCode"
        ></textarea>
      </div>
      <div id="inputText">
        <button className="TXTButton">
          Generate Image
        </button>
      </div>
    </>
  );
}

export default Redo;
