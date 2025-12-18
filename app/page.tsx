"use client";

import { animated, useSpring } from "@react-spring/web";
import Marquee from "react-fast-marquee";
import { MapDisplay } from "./components/map";
import { FAB } from "./components/fab";
import { useState, useEffect } from "react";

export default function Home() {
  const [fabState, setFabState] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.matchMedia("(min-width: 768px)").matches);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const [springs, api] = useSpring(() => ({
    from: { x: "-100%" },
  }));

  const handleFabClick = () => {
    setFabState((prev) => {
      const newState = !prev;
      if (!isLargeScreen) {
        api.start({
          x: newState ? "0%" : "-100%",
          config: { tension: 400, friction: 40 },
        });
      }
      return newState;
    });
  };

  return (
    <div className="w-screen h-screen md:w-full md:h-full md:min-w-7xl md:min-h-180 aspect-video overflow-hidden">
      <div className="flex">
        <FAB state={fabState} onClick={handleFabClick} />
        <animated.aside
          style={isLargeScreen ? {} : { ...springs }}
          className="w-screen h-screen bg-white md:w-1/4 flex shadow-xl z-10"
        >
          <div className="w-1/8 h-full p-1 bg-linear-to-b from-green-500 to-green-800 flex flex-col justify-end pb-[10cqi]">
            <p className="text-white text-xl font-bold -mb-4">1</p>
            <p className="text-white text-4xl self-center rotate-45">/</p>
            <p className="text-white text-xl font-bold self-end -mt-4">2</p>
          </div>

          <div className="w-full">
            <div className="w-full border-b-5 border-black contain-inline-size">
              <div className="pl-4 py-2 border-b border-gray-300 pb-6">
                <h1 className="text-[calc(3rem+3cqi)] font-bold">山手線</h1>
                <p className="text-2xl mt-2">全線</p>
              </div>

              <div className="pl-4 py-2 border-b border-gray-300">
                <h2 className="text-[calc(2.5rem+1cqi)] font-bold">⚠️ 遅延</h2>
              </div>

              <div className="pl-4 py-2 flex items-baseline gap-1">
                <p className="pl-2">原因:</p>
                <h3 className="text-2xl">信号機故障</h3>
              </div>
            </div>
            <div className="w-full border-black">
              <div className="pl-4 py-2 border-b border-gray-300">
                <h1 className="text-[calc(1.5rem+1cqi)] font-bold">
                  Yamanote Line
                </h1>
                <p className="text-2xl mt-4">All</p>
              </div>

              <div className="pl-4 py-2 border-b border-gray-300 flex items-baseline gap-1">
                <p>status:</p>
                <h2 className="text-2xl font-bold">Delay</h2>
              </div>

              <div className="pl-4 py-2 flex items-baseline gap-1">
                <p>cause:</p>
                <h3 className="text-xl">Signal trouble</h3>
              </div>
            </div>
          </div>
        </animated.aside>
        <MapDisplay />
      </div>

      <animated.footer
        style={isLargeScreen ? {} : { ...springs }}
        className="bg-black-600 w-full h-1/6 fixed bottom-0 left-0 bg-black z-20"
      >
        <div className="w-full h-1/2 bg-zinc-900 text-white flex flex-nowrap overflow-x-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="w-1/7 max-md:w-1/3 py-1 px-2 shrink-0">
            <div className="opacity-50 border-b-2 border-gray-500">
              <span className="text-xl">JR東日本線</span>
              <span className="text-xs">からの</span>
            </div>
            <div className="opacity-75">
              <p className="text-2xl">振替路線 1 / 2</p>
            </div>
          </div>
          <div className="py-2 bg-zinc-800 flex items-center w-1/6 max-lg:w-1/4 shrink-0">
            <p className="px-2 text-4xl max-md:px-1 max-md:text-xl font-bold whitespace-nowrap">
              東京メトロ
            </p>
          </div>
          <div className="bg-zinc-600 w-1/18 max-md:w-1/6 border-r border-black flex flex-col justify-center shrink-0">
            <p className="text-xl px-1 border-b-2 border-zinc-700 flex-1 whitespace-nowrap">
              全路線
            </p>
            <p className="text-xl px-1 flex-1"></p>
          </div>
          <div className="py-2 bg-zinc-800 flex items-center w-1/6 max-lg:w-1/4 shrink-0">
            <p className="px-2 text-4xl max-md:px-1 max-md:text-xl font-bold whitespace-nowrap">
              都営地下鉄
            </p>
          </div>
          <div className="bg-zinc-600 w-1/18 max-md:w-1/6 border-r border-black flex flex-col justify-center shrink-0">
            <p className="text-xl px-1 border-b-2 border-zinc-700 flex-1 whitespace-nowrap">
              全路線
            </p>
            <p className="text-xl px-1 flex-1"></p>
          </div>
          <div className="py-2 bg-zinc-800 flex items-center w-1/6 max-lg:w-1/4 shrink-0">
            <p className="px-2 text-4xl max-md:px-1 max-md:text-xl font-bold whitespace-nowrap">
              小田急線
            </p>
          </div>
          <div className="bg-zinc-600 w-1/18 max-md:w-1/6 border-r border-black flex flex-col justify-center shrink-0">
            <p className="text-xl px-1 border-b-2 border-zinc-700 flex-1 whitespace-nowrap">
              新宿
            </p>
            <p className="text-xl px-1 flex-1 whitespace-nowrap">下北沢</p>
          </div>
        </div>
        <div className="w-full h-1/2 bg-zinc-900 text-white flex py-4">
          <Marquee
            className="text-4xl text-nowrap"
            speed={200}
            gradient={false}
          >
            現在、山手線における信号機故障のため、一部列車に遅延が発生しております。なお、このデータはダミーです。実際は遅延していないかもしれません。
          </Marquee>
        </div>
      </animated.footer>
    </div>
  );
}
