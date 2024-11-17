import redirectIfLoggedIn from "@/hoc/redirect-if-logged-in";
import withPublicPage from "@/hoc/with-public-page";
import { compose } from "@reduxjs/toolkit";

export default compose(
  redirectIfLoggedIn("/user-profile"),
  withPublicPage
)(function () {
  return <div>Landing Page</div>;
}) as React.FC;
