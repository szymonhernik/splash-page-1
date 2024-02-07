import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-neutral-800 flex-1 overflow-y-auto ">
      <div className="grow h-full flex justify-center items-center w-[calc(100vw-16rem)] underline">
        <Link href="/">go back to canvas</Link>
      </div>
    </div>
  );
}
