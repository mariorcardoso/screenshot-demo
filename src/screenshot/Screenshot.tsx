import { useState, useRef, Fragment } from "react";
import { ScreenshotPreview } from "./ScreenshotPreview";
import { imagePreview, imageCapture } from "./ImagePreviewCapture";

export const Screenshot = () => {
  const [canCapture, setCanCapture] = useState(false);
  const [image, setImage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const initiateImagePreview = async () => {
    setCanCapture(true);
    const mediaStream = await imagePreview({ videoRef });
    if (!mediaStream) setCanCapture(false);
  };

  const captureImageInPreview = async () => {
    setCanCapture(false);
    const frame = await imageCapture({ videoRef });
    // set image in param to eventually send in API request
    setImage(frame || "");
  };

  return (
    <Fragment>
      <div>
        <button disabled={canCapture} onClick={initiateImagePreview}>
          Preview
        </button>
        <button disabled={!canCapture} onClick={captureImageInPreview}>
          Capture
        </button>
      </div>
      <ScreenshotPreview image={image} videoRef={videoRef} />
    </Fragment>
  );
};
