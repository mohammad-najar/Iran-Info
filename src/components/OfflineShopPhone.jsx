import { useEffect, useRef, useState } from "react";
import { CirclePlay, Heart, Home, Plus, Search, Send, User } from "lucide-react";
import instagramWordmark from "../assets/Instagram.png";

const MAX_PULL = 86;

export default function OfflineShopPhone({
  showImpactCaption = true,
  showDivider = true,
}) {
  const phoneScreenRef = useRef(null);
  const startYRef = useRef(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const startPull = (clientY) => {
    if (isRefreshing) return;
    startYRef.current = clientY;
    setShowFailure(false);
  };

  const movePull = (clientY) => {
    if (startYRef.current === null || isRefreshing) return;
    setPullDistance(Math.min(MAX_PULL, Math.max(0, clientY - startYRef.current)));
  };

  const refreshFeed = () => {
    if (isRefreshing) return;

    setShowFailure(false);
    setIsRefreshing(true);
    setPullDistance(34);

    window.setTimeout(() => {
      setIsRefreshing(false);
      setPullDistance(0);
      setShowFailure(true);
    }, 950);
  };

  const endPull = () => {
    if (startYRef.current === null || isRefreshing) return;

    startYRef.current = null;

    if (pullDistance < 52) {
      setPullDistance(0);
      return;
    }

    refreshFeed();
  };

  useEffect(() => {
    const phoneScreen = phoneScreenRef.current;
    if (!phoneScreen) return;

    const handleWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (event.deltaY > 0) {
        refreshFeed();
      }
    };

    phoneScreen.addEventListener("wheel", handleWheel, { passive: false });

    return () => phoneScreen.removeEventListener("wheel", handleWheel);
  });

  return (
    <div
      className={
        showDivider
          ? "my-10 border-y border-white/10 py-8 sm:my-12 sm:py-10"
          : ""
      }
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center">
        <div className="relative w-[252px] rounded-[34px] border border-white/15 bg-black p-2 shadow-2xl shadow-black/40 sm:w-[276px]">
          <div className="absolute left-1/2 top-3 z-30 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

          <div
            ref={phoneScreenRef}
            className="relative h-[505px] overflow-hidden rounded-[27px] bg-[#fafafa] text-[#181818] touch-none sm:h-[548px]"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              startPull(event.clientY);
            }}
            onPointerMove={(event) => movePull(event.clientY)}
            onPointerUp={endPull}
            onPointerCancel={endPull}
          >
            <div
              className="absolute inset-x-0 top-0 flex h-14 items-center justify-center text-xs text-gray-500 transition-transform duration-200"
              style={{ transform: `translateY(${pullDistance - 56}px)` }}
            >
              <span className={isRefreshing ? "animate-spin" : ""}>↻</span>
              <span className="ml-2">
                {isRefreshing ? "Refreshing..." : "Pull to refresh"}
              </span>
            </div>

            <div
              className="flex h-full flex-col transition-transform duration-200"
              style={{ transform: `translateY(${pullDistance}px)` }}
            >
              <header className="grid h-[70px] shrink-0 grid-cols-3 items-center border-b border-gray-200 px-4 pt-4">
                <Plus size={22} strokeWidth={2} />
                <img
                  src={instagramWordmark}
                  alt="Instagram"
                  className="h-11 w-auto max-w-[144px] justify-self-center object-contain"
                />
                <Heart className="justify-self-end" size={21} strokeWidth={1.9} />
              </header>

              <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 text-3xl text-gray-400">
                  !
                </div>
                <h4 className="mt-5 text-base font-semibold">Couldn&apos;t refresh feed</h4>
                <p className="mt-2 text-sm leading-5 text-gray-500">
                  Check your internet connection and try again.
                </p>
                {showFailure && (
                  <p className="mt-4 rounded-full bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600">
                    Unable to connect
                  </p>
                )}
              </main>

              <footer className="grid h-14 shrink-0 grid-cols-5 place-items-center border-t border-gray-200 px-3 text-gray-800">
                <Home size={21} strokeWidth={1.9} />
                <CirclePlay size={21} strokeWidth={1.9} />
                <Send size={21} strokeWidth={1.9} />
                <Search size={21} strokeWidth={1.9} />
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-800">
                  <User size={15} strokeWidth={1.9} />
                </span>
              </footer>
            </div>
          </div>
        </div>

        {showImpactCaption && (
          <p className="mt-6 max-w-2xl text-center text-sm leading-6 text-white/55 sm:text-base">
            Imagine building a small online shop with years of work, only to wake
            up and find that you can no longer reach your customers or even see
            your own storefront.
          </p>
        )}
        <p className="mt-3 text-center text-xs font-medium text-white/40">
          Pull down or scroll down over the phone to try to reload.
        </p>
      </div>
    </div>
  );
}
