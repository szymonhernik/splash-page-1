"use client";
import dynamic from "next/dynamic";

const ThreeApp = dynamic(() => import("./ThreeApp"), {
  ssr: false,
});

export default function LayoutThree() {
  return <ThreeApp />;
}
