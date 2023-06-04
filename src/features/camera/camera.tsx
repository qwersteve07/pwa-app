import { useEffect, useRef, useState } from "react";

type FacingMode = "user" | "environment"

export default function Camera() {
  const [show, setShow] = useState<boolean>(false);
  const [videoFacingMode, setVideoFacingMode] = useState<FacingMode>("user");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  function setVideoStream({ facingMode = videoFacingMode }) {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: { width: 1000, height: 1000, facingMode },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.log("navigator.getUserMedia error: ", error);
      });
  }

  useEffect(() => {
    if (navigator.mediaDevices && 'getUserMedia' in navigator.mediaDevices) {
      setShow(true);
      setVideoStream({ facingMode: videoFacingMode });
    }
  }, []);

  return (
    <div
      style={{
        display: show ? "block" : "none",
      }}
    >
      <video
        onClick={() => {
          let newFacingMode: FacingMode = videoFacingMode === "user" ? "environment" : "user";
          setVideoFacingMode(newFacingMode);
          setVideoStream({ facingMode: newFacingMode });
        }}
        ref={videoRef}
        width={200}
        height={200}
        autoPlay
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
}
