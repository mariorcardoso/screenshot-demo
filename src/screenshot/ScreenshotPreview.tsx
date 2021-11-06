import { Fragment, RefObject } from "react";

interface ScreenshotPreviewInput {
  showPreview: boolean;
  image: string;
  videoRef: RefObject<HTMLVideoElement>;
}

export const ScreenshotPreview = ({
  image,
  showPreview,
  videoRef,
}: ScreenshotPreviewInput) => (
  <Fragment>
    <div>
      <div>Preview 🎥</div>
      <video className="Frame" id="video" ref={videoRef} autoPlay></video>
    </div>
    <div>
      <div>Image 🖼️</div>
      <img
        className="Frame"
        alt="screen capture will be displayed here"
        src={image}
        onClick={() => openImage(image)}
      ></img>
    </div>
  </Fragment>
);

const openImage = (image: string) => {
  const newTab = window.open("");
  const screenshot = new Image();
  screenshot.src = image;
  newTab?.document.write(screenshot.outerHTML);
  newTab?.document.close();
};
