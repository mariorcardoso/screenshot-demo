import { useState, useRef, Fragment } from "react";
import { ScreenshotPreview } from "./ScreenshotPreview";
import { imagePreview, imageCapture } from "./ImagePreviewCapture";

export const Screenshot = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [image, setImage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Fragment>
      <div>
        <button
          disabled={showPreview}
          onClick={async () => {
            setShowPreview(true);
            await imagePreview({ videoRef });
          }}
        >
          Preview
        </button>
        <button
          disabled={!showPreview}
          onClick={async () => {
            const frame = await imageCapture({ videoRef });
            // set image in param to eventually send in API request
            setImage(frame || "");
            setShowPreview(false);
          }}
        >
          Capture
        </button>
      </div>
      <ScreenshotPreview
        image={image}
        showPreview={showPreview}
        videoRef={videoRef}
      />
    </Fragment>
  );
};
