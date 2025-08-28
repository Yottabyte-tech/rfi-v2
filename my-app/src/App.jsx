import { useState, useEffect, useRef } from 'react';
import './App.css';
// 1. Correctly import the local image file. This tells the bundler to process it.
import chaiyaImg from '/ChaiyaSmall.jpg';

function App() {


  // 5. Use state to hold the output, allowing React to re-render the component.
  const [out, setOut] = useState("Processing image...");
  // 2. Use useRef to get a reference to the canvas DOM element.
  const canvasRef = useRef(null);

  // 3. Use useEffect for side effects like image loading and canvas drawing.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard against no canvas element yet
    const ctx = canvas.getContext('2d');

    const img = new Image();
    // Use the imported image URL from step 1.
    img.src = chaiyaImg;

    img.onload = () => {
      let final = '';
      canvas.width = img.width;
      canvas.height = img.height;

      // Make sure the image is drawn onto the canvas before attempting to read pixels.
      ctx.drawImage(img, 0, 0);

      // Your pixel processing logic
      for(let y = 0; y < img.height; y++){
        for(let x = 0; x < img.width; x++){

          
          var red = getPixel(ctx, x, y, "red")
          var green = getPixel(ctx, x, y, "green")
          var blue = getPixel(ctx, x, y, "blue")


          final += x + " ";
          final += y + x/5 + " ";

          if(red < 50 && green < 50 && blue < 50){
            red -= 2
            green -= 2
            blue -= 2

          }


          final += red + " ";
          final += green +  " ";
          final += blue + " ";


        }
      }

      // Update the state with the final string.
      setOut(final);
      
      // Optional: Log to console and copy to clipboard as originally planned.
      console.log(final);
      navigator.clipboard.writeText(final);
    };

    // Handle potential image loading errors
    img.onerror = () => {
      setOut("Error loading image.");
    };

  }, []);

  function getPixel(ctx, x, y, clr){
    const imageData = ctx.getImageData(x, y, 1, 1);
    const pixelData = imageData.data;
    if(clr === "red"){
      return pixelData[0];
    } else if(clr === "green"){
      return pixelData[1];
    } else if(clr === "blue"){
      return pixelData[2];
    } else {
      return "error";
    }
  }

  return (
    <>
      <div>
        <canvas ref={canvasRef} width={500} height={500}></canvas>
        <p id='outCode'>{out}</p>
      </div>
    </>
  );
}

export default App;