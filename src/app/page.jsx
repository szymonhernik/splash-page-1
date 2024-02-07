import { Suspense } from "react";
import LayoutThree from "../../components/LayoutThree";

export default function Home() {
  return (
    <div className="bg-gray-200 w-full h-screen max-h-screen flex">
      <div className="bg-white grow h-full w-[calc(100vw-16rem)]">
        {" "}
        <LayoutThree />
      </div>
      <div className="w-64 pl-8 items-center pb-16 flex">
        <ul className="text-2xl text-gray-600  space-y-4">
          <li>browse</li>
          <li>about</li>
          <li>pricing</li>
          <li>mentoring</li>
          <li>discord</li>
          <li>FAQ</li>
        </ul>
      </div>
      {/* <LayoutThree />; */}
    </div>
  );
}
