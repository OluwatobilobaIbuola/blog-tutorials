import { useState, useEffect } from "react";

type Image = "cat" | "dog";

export default function App() {
  const [imageType, setImageType] = useState<Image>();
  const [clicks, setClicks] = useState(0);

  useEffect(
    function handleButtonClick() {
      let singleClickTimer: ReturnType<typeof setTimeout>;
      if (clicks === 1) {
        singleClickTimer = setTimeout(() => {
          setImageType("cat");
          setClicks(0);
        }, 250);
      } else if (clicks === 2) {
        setImageType("dog");
        setClicks(0);
      }
      return () => clearTimeout(singleClickTimer);
    },
    [clicks]
  );

  return (
    <>
      <button onClick={() => setClicks(clicks + 1)}>
        show image of a cat / dog
      </button>
      {imageType ? (
        <img
          src={`https://source.unsplash.com/random/300x300/?${imageType}`}
          alt=""
        />
      ) : null}
    </>
  );
}
