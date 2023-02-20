import React, { useRef } from "react";
import "./App.css";

function App() {
  const videoRef = useRef<any>();
  const canvasRef = useRef<any>();

  const startCamera = async function () {
    try {
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      const cameraRef = videoRef?.current;
      if (cameraRef) {
        cameraRef.srcObject = stream;
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const capture = function () {
    const cameraRef = videoRef?.current;
    const canvasEl = canvasRef?.current;
    if (canvasEl || cameraRef) {
      canvasEl
        .getContext("2d")
        .drawImage(cameraRef, 0, 0, canvasEl.width, canvasEl.height);
      let image_data_url = canvasEl.toDataURL("image/jpeg");

      // data url of the image
      console.log(image_data_url);
    }
  };

  return (
    <div>
      <button id="start-camera" onClick={startCamera}>
        Start Camera
      </button>
      <video
        ref={videoRef}
        id="video"
        width="320"
        height="240"
        autoPlay
      ></video>
      <button id="click-photo" onClick={capture}>
        Click Photo
      </button>
      <canvas ref={canvasRef} id="canvas" width="320" height="240"></canvas>
    </div>
  );
}

export default App;
