import { useState, useRef, Fragment } from "react";
import { imageCapture } from "./imageCapture";
import { imagePreview } from "./imagePreview";

export const ScreenshotTool = () => {
  const [canCapture, setCanCapture] = useState(false);
  const [image, setImage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const startImagePreview = async () => {
    const mediaStream = await imagePreview({ videoRef });
    if (mediaStream) setCanCapture(true);
  };

  const captureImageInPreview = async () => {
    setCanCapture(false);
    const frame = await imageCapture({ videoRef });
    // we can use the image in an API call to be persisted
    setImage(frame || "");
  };

  return (
    <Fragment>
      <div>
        <button disabled={canCapture} onClick={startImagePreview}>
          Preview
        </button>
        <button disabled={!canCapture} onClick={captureImageInPreview}>
          Capture
        </button>
      </div>
      <div>
        <div>Preview 🎥</div>
        <video className="Frame" id="video" ref={videoRef} autoPlay></video>
      </div>
      <div>
        <div>Image 🖼️</div>
        <img
          className="Frame"
          alt="Screen capture will be displayed here"
          src={image}
          onClick={() => openImage(image)}
        ></img>
      </div>
    </Fragment>
  );
};

const openImage = (image: string) => {
  const newTab = window.open("");
  const screenshot = new Image();
  screenshot.src = image;
  newTab?.document.write(screenshot.outerHTML);
  newTab?.document.close();
};
