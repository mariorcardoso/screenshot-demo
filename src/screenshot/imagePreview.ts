import { RefObject } from "react";

interface ImagePreviewInput {
  videoRef: RefObject<HTMLVideoElement>;
}

export const imagePreview = async ({
  videoRef,
}: ImagePreviewInput): Promise<MediaStream | undefined> => {
  try {
    const videoElem = videoRef.current;
    if (!videoElem) throw Error("Video HTML element not defined");

    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia();

    return videoElem.srcObject;
  } catch (error) {
    console.error("imagePreview error: " + error);
  }
};
