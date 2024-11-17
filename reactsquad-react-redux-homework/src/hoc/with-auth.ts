"use client";

import { UserAuthenticationContainer } from "@/features/user-authentication/user-authentication-container";
import requiresPermission from "./requires-permission";
import { getIsAuthenticated } from "@/features/user-profile/user-profile-reducer";

export default requiresPermission(
  UserAuthenticationContainer,
  getIsAuthenticated
);
