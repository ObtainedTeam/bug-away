import { useState } from "react";
import { c } from "../theme";

/**
 * VideoBlock — Easy video placeholder
 *
 * Usage:
 *   <VideoBlock src="/videos/my-video.mp4" />
 *   <VideoBlock youtube="dQw4w9WgXcQ" />
 *   <VideoBlock vimeo="123456789" />
 *   <VideoBlock placeholder label="Coming soon" />
 */
export default function VideoBlock({
  src,
  youtube,
  vimeo,
  placeholder,
  label = "Watch it in action",
  thumbnail,
  height = 480,
}) {
  const [playing, setPlaying] = useState(false);

  // YouTube embed
  if (youtube && playing) {
    return (
      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          src={`https://www.youtube.com/embed/${youtube}?autoplay=1`}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  // Vimeo embed
  if (vimeo && playing) {
    return (
      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          src={`https://player.vimeo.com/video/${vimeo}?autoplay=1`}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  // Native video - autoplay muted
  if (src) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: "100%",
          borderRadius: 12,
          display: "block",
          height: height,
          objectFit: "cover",
        }}
        src={src}
      />
    );
  }

  // Thumbnail / placeholder with play button
  return (
    <div
      onClick={() => !placeholder && setPlaying(true)}
      style={{
        position: "relative",
        height: height,
        borderRadius: 12,
        overflow: "hidden",
        cursor: placeholder ? "default" : "pointer",
        background: thumbnail
          ? `url(${thumbnail}) center/cover no-repeat`
          : `linear-gradient(135deg, ${c.skyP} 0%, ${c.sageL} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {/* Dark overlay */}
      {thumbnail && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(44,53,48,0.45)",
          }}
        />
      )}

      {/* Play button */}
      {!placeholder ? (
        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            transition: "transform 0.2s",
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              borderLeft: `20px solid ${c.sageD}`,
              marginLeft: 4,
            }}
          />
        </div>
      ) : (
        <div style={{ position: "relative", zIndex: 2, fontSize: 48 }}>🎬</div>
      )}

      {/* Label */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: "'Poppins', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: thumbnail ? "#fff" : c.sageD,
          letterSpacing: "0.05em",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        {placeholder ? (
          <>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              📹 Video coming soon
            </div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.6,
                marginTop: 4,
                fontWeight: 300,
              }}
            >
              Add your video URL in VideoBlock component
            </div>
          </>
        ) : (
          label
        )}
      </div>
    </div>
  );
}
