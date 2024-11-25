import { useEffect, useState } from "react";

type Props<T> = {
  getData: () => Promise<T>;
};

export default function useGetDataHook<T extends Record<string, any>>({
  getData,
}: Props<T>) {
  const [resource, setResource] = useState<T | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getData();
      setResource(data);
    })();
  }, [getData]);
  return {
    resource,
  };
}
