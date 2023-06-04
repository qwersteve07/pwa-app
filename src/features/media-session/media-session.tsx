import { useEffect, useRef } from "react";
import song from "../../assets/song.mp4";
import cover256 from "../../assets/song-cover-256.png";
import cover512 from "../../assets/song-cover-512.png";

export default function MediaSession() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  //  there' a bug in mediaSession API
  // if I switch the playback state, the cover will gone

  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: "Perfect Day",
        artist: "Tundra Beats",
        artwork: [
          {
            src: cover256,
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: cover512,
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
    }
  }, []);

  return (
    <div>
      <audio controls src={song} ref={audioRef} />
    </div>
  );
}
