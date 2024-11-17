import DashboardLayout from "@/app/(dashboard)/_components/dashboard-layout";

function withLayout<T extends JSX.IntrinsicAttributes>(
  WrappedComponent: React.ComponentType<T>
) {
  return function WithLayoutWrapper(props: T) {
    return (
      <DashboardLayout>
        <WrappedComponent {...props} />
      </DashboardLayout>
    );
  };
}

export default withLayout;
