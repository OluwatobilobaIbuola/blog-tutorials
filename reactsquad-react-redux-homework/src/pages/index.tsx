import redirectIfLoggedIn from "@/hoc/redirect-if-logged-in";
import withPublicPage from "@/hoc/with-public-page";
import withToast from "@/hoc/with-toast";
import { compose } from "@reduxjs/toolkit";

export default compose(
  withToast,
  redirectIfLoggedIn("/user-profile"),
  withPublicPage
)(function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center text-[28px]">
      Landing Page
    </div>
  );
}) as React.FC;
