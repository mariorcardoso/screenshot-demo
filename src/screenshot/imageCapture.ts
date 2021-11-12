import { RefObject } from "react";

interface ImagePreviewCaptureInput {
  videoRef: RefObject<HTMLVideoElement>;
}

export const imageCapture = async ({
  videoRef,
}: ImagePreviewCaptureInput): Promise<string | undefined> => {
  try {
    const videoElem = videoRef.current;
    if (!videoElem) throw Error("Video HTML element not defined");

    let mediaStream = videoElem.srcObject as MediaStream;
    if (!mediaStream) throw Error("Video MediaStream not defined");

    const canvas = createCanvasForStreamTrack(mediaStream);
    canvas.getContext("2d")?.drawImage(videoElem, 0, 0);
    const frame = canvas.toDataURL("image/png");

    mediaStream.getTracks().forEach((track) => track.stop());

    return frame;
  } catch (error) {
    console.error("imageCapture error: " + error);
  }
};

const createCanvasForStreamTrack = (mediaStream: MediaStream) => {
  const canvas = document.createElement("canvas");

  const videoTrackSettings = mediaStream.getVideoTracks()[0].getSettings();
  canvas.width = videoTrackSettings.width || 100;
  canvas.height = videoTrackSettings.height || 100;

  return canvas;
};
