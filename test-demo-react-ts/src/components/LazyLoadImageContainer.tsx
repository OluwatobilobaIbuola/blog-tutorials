import { ReactNode } from "react";

export default function LazyLoadingImageContainer({
  children,
  loaded,
  bgUrl,
}: {
  children: ReactNode;
  loaded: boolean;
  bgUrl: string;
}) {
  return (
    <div
      className={`bg-no-repeat bg-cover ${!loaded ? bgUrl : ""}  
 before:bg-white before:absolute before:inset-0 before:opacity-0 ${
   !loaded ? "before:content-['']" : "before:content-none"
 }  ${!loaded ? "animate-pulse" : "animate-none"}`}
    >
      {children}
    </div>
  );
}
