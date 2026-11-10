"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";

interface SamsungHeroVideoProps {
  className?: string;
  poster?: string;
}

export default function SamsungHeroVideo({
  className = "",
  poster = "/samsung-phone-hero.png",
}: SamsungHeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // States: "loading" | "playing" | "holding" | "paused"
  const [playbackState, setPlaybackState] = useState<"loading" | "playing" | "holding" | "paused">("loading");
  const [isManualPause, setIsManualPause] = useState(false);

  // Hold timer state (5000ms hold after ended)
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const holdRemainingRef = useRef<number>(5000);
  const holdStartTimestampRef = useRef<number | null>(null);
  const isManualPauseRef = useRef<boolean>(false);
  const isInViewportRef = useRef<boolean>(true);

  // Clear any existing hold timer
  const clearHoldTimer = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  }, []);

  // Start or resume the 5000ms hold timer
  const startHoldTimer = useCallback((durationMs: number) => {
    clearHoldTimer();
    holdRemainingRef.current = durationMs;
    holdStartTimestampRef.current = Date.now();
    setPlaybackState("holding");

    holdTimerRef.current = setTimeout(() => {
      clearHoldTimer();
      holdRemainingRef.current = 5000;
      holdStartTimestampRef.current = null;

      // Only restart if not manually paused and in viewport
      if (!isManualPauseRef.current && isInViewportRef.current && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current
          .play()
          .then(() => {
            setPlaybackState("playing");
          })
          .catch((err) => {
            console.warn("Replay failed:", err);
            setPlaybackState("paused");
          });
      }
    }, durationMs);
  }, [clearHoldTimer]);

  // Handle video ended
  const handleEnded = useCallback(() => {
    // Keep final frame displayed on screen
    // Start 5-second hold
    if (!isManualPauseRef.current && isInViewportRef.current) {
      startHoldTimer(5000);
    } else {
      setPlaybackState("holding");
      holdRemainingRef.current = 5000;
    }
  }, [startHoldTimer]);

  // Manual Toggle Play / Pause
  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playbackState === "playing") {
      // Pause active playback
      video.pause();
      isManualPauseRef.current = true;
      setIsManualPause(true);
      setPlaybackState("paused");
    } else if (playbackState === "holding") {
      // Pause active hold timer
      if (holdStartTimestampRef.current) {
        const elapsed = Date.now() - holdStartTimestampRef.current;
        holdRemainingRef.current = Math.max(0, holdRemainingRef.current - elapsed);
      }
      clearHoldTimer();
      isManualPauseRef.current = true;
      setIsManualPause(true);
      setPlaybackState("paused");
    } else {
      // Currently paused -> Resume
      isManualPauseRef.current = false;
      setIsManualPause(false);

      const isAtEnd = video.ended || (video.duration && video.currentTime >= video.duration - 0.1);
      if (isAtEnd) {
        if (holdRemainingRef.current > 0) {
          startHoldTimer(holdRemainingRef.current);
        } else {
          video.currentTime = 0;
          video.play().then(() => setPlaybackState("playing")).catch(console.warn);
        }
      } else {
        video.play().then(() => setPlaybackState("playing")).catch(console.warn);
      }
    }
  };

  // Initial Autoplay & Brand Switching setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset playback on mount (Stage 1)
    video.currentTime = 0;
    clearHoldTimer();
    holdRemainingRef.current = 5000;
    isManualPauseRef.current = false;
    setIsManualPause(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setPlaybackState("playing");
        })
        .catch((err) => {
          // Autoplay policy or user interaction needed
          console.warn("Autoplay prevented:", err);
          setPlaybackState("paused");
        });
    }

    return () => {
      clearHoldTimer();
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [clearHoldTimer]);

  // Tab visibility management (Stage 5 background-tab behavior)
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        // Page hidden: pause playback and hold timer
        if (playbackState === "playing") {
          video.pause();
        } else if (playbackState === "holding") {
          if (holdStartTimestampRef.current) {
            const elapsed = Date.now() - holdStartTimestampRef.current;
            holdRemainingRef.current = Math.max(0, holdRemainingRef.current - elapsed);
          }
          clearHoldTimer();
        }
      } else {
        // Page visible: resume if not manually paused and in viewport
        if (!isManualPauseRef.current && isInViewportRef.current) {
          const isAtEnd = video.ended || (video.duration && video.currentTime >= video.duration - 0.1);
          if (isAtEnd) {
            startHoldTimer(holdRemainingRef.current);
          } else {
            video.play().then(() => setPlaybackState("playing")).catch(console.warn);
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [playbackState, clearHoldTimer, startHoldTimer]);

  // IntersectionObserver to pause when hero is scrolled out of viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isInViewportRef.current = entry.isIntersecting;

        if (!entry.isIntersecting) {
          if (video && !video.paused) {
            video.pause();
          }
          if (holdTimerRef.current) {
            if (holdStartTimestampRef.current) {
              const elapsed = Date.now() - holdStartTimestampRef.current;
              holdRemainingRef.current = Math.max(0, holdRemainingRef.current - elapsed);
            }
            clearHoldTimer();
          }
        } else {
          // Scrolled back into view
          if (!isManualPauseRef.current && !document.hidden) {
            const isAtEnd = video.ended || (video.duration && video.currentTime >= video.duration - 0.1);
            if (isAtEnd) {
              startHoldTimer(holdRemainingRef.current);
            } else {
              video.play().then(() => setPlaybackState("playing")).catch(console.warn);
            }
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
    };
  }, [clearHoldTimer, startHoldTimer]);

  const isActuallyPlaying = playbackState === "playing" || playbackState === "holding";

  return (
    <div className={`relative w-full flex items-center justify-center ${className}`}>
      {/* 9:16 Cinematic Video Container */}
      <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[560px] xl:max-w-[620px] aspect-[9/16] rounded-none overflow-hidden bg-white flex items-center justify-center">
        <video
          ref={videoRef}
          src="/videos/samsung-hero-cinematic.mp4"
          poster={poster}
          muted
          autoPlay
          playsInline
          preload="auto"
          onEnded={handleEnded}
          onPlaying={() => setPlaybackState("playing")}
          className="w-full h-full object-contain pointer-events-none select-none drop-shadow-sm"
          style={{
            backgroundColor: "#FFFFFF",
          }}
          aria-label="Samsung Galaxy Z Fold8 Ultra, Fold8, and Flip8 rising into view animation"
        />

        {/* Optional Subtle Play/Pause Button from Reference (bottom-left) */}
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isActuallyPlaying ? "Pause presentation" : "Play presentation"}
          title={isActuallyPlaying ? "Pause" : "Play"}
          className="absolute bottom-3 left-4 sm:left-6 z-20 w-7 h-7 rounded-full border border-black/35 bg-white/80 backdrop-blur-sm flex items-center justify-center text-black/80 hover:text-black hover:border-black transition-all focus:outline-none focus:ring-1 focus:ring-black shadow-sm"
        >
          {isActuallyPlaying ? (
            <span className="flex gap-[2.5px] items-center justify-center">
              <span className="w-[1.5px] h-2.5 bg-current rounded-full" />
              <span className="w-[1.5px] h-2.5 bg-current rounded-full" />
            </span>
          ) : (
            <span className="w-0 h-0 border-y-[4px] border-y-transparent border-l-[6.5px] border-l-current ml-0.5" />
          )}
        </button>
      </div>
    </div>
  );
}
