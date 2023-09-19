import { useEffect, useRef, useState } from "react";

export default function useLazyLoadingHandler() {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    function loadedHanlder() {
      setLoaded(true);
    }
    if (imgRef.current?.complete) {
      loadedHanlder();
    } else {
      imgRef.current?.addEventListener("load", loadedHanlder);
    }
    return () => imgRef.current?.removeEventListener("load", loadedHanlder);
  }, [loaded]);

  return { loaded, imgRef };
}
