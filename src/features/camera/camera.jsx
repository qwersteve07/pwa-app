import { useEffect, useRef, useState } from "react";

export default function Camera() {
  const [show, setShow] = useState(false);
  const [videoFacingMode, setVideoFacingMode] = useState("user");
  const videoRef = useRef();

  function setVideoStream() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: { width: 1000, height: 1000, facingMode: videoFacingMode },
      })
      .then((stream) => {
        console.log(stream);
        if ("srcObject" in videoRef.current) {
          videoRef.current.srcObject = stream;
        } else {
          videoRef.current.src = window.URL.createObjectURL(stream);
        }
      })
      .catch((error) => {
        console.log("navigator.getUserMedia error: ", error);
      });
  }

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setShow(true);
      setVideoStream();
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
          let newFacingMode =
            videoFacingMode === "user" ? "environment" : "user";
          setVideoFacingMode(newFacingMode);
          console.log(newFacingMode);
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
