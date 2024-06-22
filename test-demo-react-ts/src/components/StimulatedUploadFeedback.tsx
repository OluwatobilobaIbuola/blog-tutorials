import React, { useState } from "react";

export default function StimulatedUploadFeedback() {
  const [uploadProgress, setUploadProgress] = useState<number>(5);
  const startSimulatedProgress = () => {
    setUploadProgress(5);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };
  const handleUpload = async () => {
    const progressInterval = startSimulatedProgress();
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve("Done");
      }, 20000);
    });
    clearInterval(progressInterval);
    setUploadProgress(100);
  };

  return (
    <div className="w-[300px]">
      <div className=" rounded-sm">
        <div
          style={{ width: `${uploadProgress}%` }}
          className={` ${
            uploadProgress === 100 ? "bg-[green]" : "bg-[blue]"
          } h-4 rounded-sm duration-1000 ease-in-out`}
        />
      </div>
      <button
        className="h-[42px] w-full bg-black text-white rounded-md mt-6"
        onClick={() => handleUpload()}
      >
        Start
      </button>
    </div>
  );
}
