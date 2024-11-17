import { baseUrl } from "@/utils/apiUrls";
import { publicRequest } from "@/lib/axios/public-request";
import getDataProperty from "@/utils/get-data-property";
import { ServerUser } from "@/types";

export const loginRequest = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<ServerUser> => {
  return publicRequest(`${baseUrl}`)
    .post(`/auth/admin/login`, {
      email,
      password,
    })
    .then(getDataProperty);
};
