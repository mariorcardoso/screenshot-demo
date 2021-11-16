import { RefObject } from "react";

interface ImageCaptureInput {
  videoRef: RefObject<HTMLVideoElement>;
}

export const imageCapture = async ({
  videoRef,
}: ImageCaptureInput): Promise<string | undefined> => {
  try {
    const videoElem = videoRef.current;
    if (!videoElem) throw Error("Video HTML element not defined");

    let mediaStream = videoElem.srcObject as MediaStream;
    if (!mediaStream) throw Error("Video MediaStream not defined");

    const track = mediaStream.getVideoTracks()[0];
    const image = generateImageWithCanvas(track, videoElem);
    // const image = await generateImageWithImageCapture(mediaStreamTrack);

    mediaStream.getTracks().forEach((track) => track.stop());

    return image;
  } catch (error) {
    console.error("imageCapture error: " + error);
  }
};

// Does not work because when we try to takePhoto the track is muted
// you can't take photos with takePhoto when tracks are muted
// More details in the following links:
// https://github.com/w3c/mediacapture-screen-share/issues/141
// https://github.com/chromium/chromium/blob/master/third_party/blink/renderer/modules/imagecapture/image_capture.cc

// const generateImageWithImageCapture = async (track: MediaStreamTrack) => {
//   const { width, height } = track.getSettings();
//   const capture = new ImageCapture(track);

//   debugger;

//   const imgBlob = await capture.takePhoto({
//     imageWidth: width,
//     imageHeight: height,
//   });

//   return URL.createObjectURL(imgBlob);
// };

const generateImageWithCanvas = (
  track: MediaStreamTrack,
  videoElem: HTMLVideoElement
) => {
  const canvas = document.createElement("canvas");

  const { width, height } = track.getSettings();
  canvas.width = width || 100;
  canvas.height = height || 100;

  canvas.getContext("2d")?.drawImage(videoElem, 0, 0);
  const image = canvas.toDataURL("image/png");

  return image;
};
