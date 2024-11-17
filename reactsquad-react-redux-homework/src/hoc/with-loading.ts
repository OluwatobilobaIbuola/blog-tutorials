"use client";

import { getAppFinishedLoading } from "@/features/app-loading/app-loading-reducer";
import requiresPermission from "./requires-permission";
import AppLoadingComponent from "@/features/app-loading/app-loading-component";

export default requiresPermission(AppLoadingComponent, getAppFinishedLoading);
