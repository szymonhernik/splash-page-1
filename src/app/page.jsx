import dynamic from "next/dynamic";
import Image from "next/image";

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
      <div className="absolute pointer-events-none top-0 left-0 w-full h-full mix-blend-exclusion opacity-60 ">
        <Image
          src="/layers.png"
          width={800}
          height={20}
          className="w-auto object-cover h-full "
        />
      </div>
      <div className="absolute pointer-events-none bottom-48 right-16 animate-pulse w-3/4 mix-blend-screen opacity-80">
        <Image
          src="/text.png"
          width={800}
          height={20}
          className="w-full object-cover  "
        />
      </div>
      <div className="absolute bottom-16 right-16 text-black px-8 py-4 bg-white cursor-pointer">
        <h1>Subscribe</h1>
      </div>
    </div>
  );
}
