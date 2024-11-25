import UserProfile from "@/features/user-profile/user-profile-component";
import withPrivatePage from "@/hoc/with-private-page";
import withToast from "@/hoc/with-toast";
import { compose } from "@reduxjs/toolkit";

export default compose(
  withToast,
  withPrivatePage
)(UserProfile) as React.FC;
