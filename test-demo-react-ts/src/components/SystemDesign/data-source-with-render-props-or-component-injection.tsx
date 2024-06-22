import useGetDataHook from "../../Hooks/useGetDataHook";

export const DataSourceWithRenderProps = <T extends Record<string, any>>({
  getData,
  render,
}: {
  getData: () => Promise<T>;
  render: (resource: T) => JSX.Element;
}) => {
  const { resource } = useGetDataHook({ getData });
  if (resource) return render(resource);
  return null;
};

export const DataSourceWithComponentInjection = <
  T extends Record<string, any>
>({
  getData,
  render: Render,
}: {
  getData: () => Promise<T>;
  render: React.FC<{ resource: T }>;
}) => {
  const { resource } = useGetDataHook({ getData });
  if (resource) return <Render resource={resource} />;
  return null;
};
