import { RefObject } from "react";

interface ImagePreviewCaptureInput {
  videoRef: RefObject<HTMLVideoElement>;
}

export const imageCapture = async ({ videoRef }: ImagePreviewCaptureInput) => {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw Error("Canvas context not defined");

    const videoElem = videoRef.current;
    if (!videoElem) throw Error("Video HTML element not defined");

    let mediaStream = videoElem.srcObject as MediaStream;
    if (!mediaStream) throw Error("Video MediaStream not defined");

    canvas.width = mediaStream.getVideoTracks()[0].getSettings().width || 100;
    canvas.height = mediaStream.getVideoTracks()[0].getSettings().height || 100;

    context.drawImage(videoElem, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL("image/png");

    mediaStream.getTracks().forEach((track) => track.stop());

    return frame;
  } catch (error) {
    console.error("Error: " + error);
  }
};

export const imagePreview = async ({ videoRef }: ImagePreviewCaptureInput) => {
  try {
    const videoElem = videoRef.current;
    if (!videoElem) throw Error("Video HTML element not defined");

    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia();

    dumpOptionsInfo(videoElem);
  } catch (error) {
    console.error("Start preview error: " + error);
  }
};

const dumpOptionsInfo = (video: HTMLVideoElement) => {
  const videoTrack = (video.srcObject as MediaStream).getVideoTracks()[0];

  console.info("Track settings:", JSON.stringify(videoTrack.getSettings()));
  console.info("Track settings:", JSON.stringify(videoTrack.getConstraints()));
};
