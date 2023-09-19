import useLazyLoadingHandler from "../Hooks/useLazyLoadingHandler";
import { nonAuthBrandImage } from "../assets";
import LazyLoadingImageContainer from "./LazyLoadImageContainer";

export default function LazyLoadingImage() {
  const { loaded, imgRef } = useLazyLoadingHandler();
  return (
    <>
      <div className="flex">
        <div className="">
          {" "}
          <img
            src={nonAuthBrandImage}
            alt="expressing identity service trust"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative">
          <LazyLoadingImageContainer
            loaded={loaded}
            bgUrl="bg-[url('/src/assets/nonAuthBannerSmall.png')]"
          >
            <img
              ref={imgRef}
              src={nonAuthBrandImage}
              alt="expressing identity service trust"
              className={`w-full h-full object-cover transition ease-in-out duration-300 ${
                !loaded ? "opacity-0" : "opacity-100"
              }`}
            />
          </LazyLoadingImageContainer>
          <div className="absolute w-full flex items-center flex-col bottom-[20%] text-white">
            <h4 className="text-[20px] sm:text-[36px] font-[500]">Canonin</h4>
            <p className="text-center text-[16px] sm:text-[24px] max-w-[500px] mx-auto w-full">
              Nigeria's trusted identity verification solution for seamless user
              authentication
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
