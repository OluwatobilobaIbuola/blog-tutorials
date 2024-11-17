import { UserAuthenticationContainer } from "@/features/user-authentication/user-authentication-container";
import redirectIfLoggedIn from "@/hoc/redirect-if-logged-in";
import withPublicPage from "@/hoc/with-public-page";
import { compose } from "@reduxjs/toolkit";

export default compose(
  redirectIfLoggedIn("/user-profile"),
  withPublicPage
)(UserAuthenticationContainer) as React.FC;
