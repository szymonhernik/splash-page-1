import dynamic from "next/dynamic";

const ThreeApp = dynamic(() => import("../../components/ThreeApp"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="animate-pulse text-black"> Loading...</h1>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="bg-gray-200 flex-1 overflow-y-auto relative">
      {" "}
      <ThreeApp />
      <div className="absolute bottom-16 right-16 text-black px-8 py-4 bg-white cursor-pointer">
        <h1>Subscribe</h1>
      </div>
    </div>
  );
}
