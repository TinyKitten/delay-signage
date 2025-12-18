import { GL } from "@luma.gl/constants";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, PathLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/maplibre";
import DELAYED_STATION_DATA from "../data/jy.json";
import SUSPENDED_STATION_DATA from "../data/jk.json";
import { useEffect, useMemo, useState } from "react";

const delayedPathCoordinates = DELAYED_STATION_DATA.map((s) => s.coordinates);
delayedPathCoordinates.push(delayedPathCoordinates[0]);

const suspendedPathCoordinates = SUSPENDED_STATION_DATA.map(
  (s) => s.coordinates
);

const jyLayers = [
  new PathLayer({
    id: "delayed-railway-layer",
    data: [{ path: delayedPathCoordinates }],
    getPath: (d) => d.path,
    getColor: [128, 194, 65],
    getWidth: 100,
    widthMinPixels: 4,
    jointRounded: true,
    capRounded: true,
    miterLimit: 4,
  }),

  new ScatterplotLayer({
    id: "delayed-station-layer",
    data: DELAYED_STATION_DATA,
    getPosition: (d) => d.coordinates,
    getFillColor: [255, 255, 255],
    getLineColor: [0, 0, 0],
    getRadius: 180,
    stroked: true,
    lineWidthMinPixels: 2,
  }),
];

const jkLayers = [
  new PathLayer({
    id: "suspended-railway-layer",
    data: [{ path: suspendedPathCoordinates }],
    getPath: (d) => d.path,
    getColor: [0, 178, 229],
    getWidth: 100,
    widthMinPixels: 4,
    jointRounded: true,
    capRounded: true,
    miterLimit: 4,
  }),

  new ScatterplotLayer({
    id: "suspended-station-layer",
    data: SUSPENDED_STATION_DATA,
    getPosition: (d) => d.coordinates,
    getFillColor: [255, 255, 255],
    getLineColor: [0, 0, 0],
    getRadius: 180,
    stroked: true,
    lineWidthMinPixels: 2,
  }),
];

const STYLES = {
  normal: {
    layers: [{ color: [0, 180, 0], width: 100, opacity: 1.0 }],
  },
  delay: {
    layers: [
      { color: [255, 255, 0], width: 400, opacity: 0.3 },
      { color: [255, 255, 150], width: 120, opacity: 1.0 },
    ],
  },
  suspended: {
    layers: [
      { color: [255, 0, 0], width: 500, opacity: 0.3 },
      { color: [255, 180, 180], width: 120, opacity: 1.0 },
    ],
  },
};

const createGlowLayers = (
  idPrefix: string,
  pathData: number[][],
  colorBase: [number, number, number],
  currentPulseState: boolean
) => {
  const [r, g, b] = colorBase;
  const currentOuterWidth = currentPulseState ? 1400 : 900;
  return [
    new PathLayer({
      id: `${idPrefix}-glow-outer`,
      data: [{ path: pathData }],
      getPath: (d) => d.path,
      getColor: [r, g - 50 > 0 ? g - 50 : 0, b],
      getWidth: currentOuterWidth,
      transitions: {
        getWidth: {
          duration: 800,
          easing: (t: number) => t,
        },
      },
      widthMinPixels: 15,
      opacity: 0.3,
      jointRounded: true,
      capRounded: true,
      miterLimit: 4,
      getPolygonOffset: () => [0, 100],
      parameters: {
        depthTest: false,
        blend: true,
        blendFunc: [GL.SRC_ALPHA, GL.ONE],
      },
    }),

    new PathLayer({
      id: `${idPrefix}-glow-inner`,
      data: [{ path: pathData }],
      getPath: (d) => d.path,
      getColor: [r, g, b],
      getWidth: 300,
      widthMinPixels: 6,
      opacity: 0.7,
      jointRounded: true,
      capRounded: true,
      getPolygonOffset: () => [0, 0],
    }),

    new PathLayer({
      id: `${idPrefix}-core-line`,
      data: [{ path: pathData }],
      getPath: (d) => d.path,
      getColor: [255, 255, 255],
      getWidth: 100,
      widthMinPixels: 3,
      opacity: 1.0,
      jointRounded: true,
      capRounded: true,
      getPolygonOffset: () => [0, -100],
    }),
  ];
};

export const MapDisplay = () => {
  const [isPulsingExpanded, setIsPulsingExpanded] = useState(true);

  const delayedJYLayers = useMemo(
    () =>
      createGlowLayers(
        "jy-glow",
        delayedPathCoordinates,
        STYLES.delay.layers[0].color as [number, number, number],
        isPulsingExpanded
      ),
    [isPulsingExpanded]
  );
  const suspendedJKLayers = useMemo(
    () =>
      createGlowLayers(
        "jk-glow",
        suspendedPathCoordinates,
        STYLES.suspended.layers[0].color as [number, number, number],
        isPulsingExpanded
      ),
    [isPulsingExpanded]
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsPulsingExpanded((prev) => !prev);
    }, 800);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <DeckGL
      initialViewState={{
        longitude: 139.73,
        latitude: 35.69,
        zoom: 11,
        pitch: 45,
        bearing: 0,
      }}
      controller={true}
      layers={[
        ...delayedJYLayers,
        ...jyLayers,
        ...suspendedJKLayers,
        ...jkLayers,
      ]}
    >
      <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
    </DeckGL>
  );
};
