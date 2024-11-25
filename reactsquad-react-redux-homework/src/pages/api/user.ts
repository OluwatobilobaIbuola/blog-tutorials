import { StatusCode } from "@/enums/httpStatusCode";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as string);
    if (!authHeader?.startsWith("Bearer ")) {
      res.status(StatusCode.UNAUTHORIZED).json({
        status: true,
        statusCode: StatusCode.UNAUTHORIZED,
        message: "Unauthorized request",
      });
      return;
    }
    res.status(StatusCode.SUCCESS).json({
      status: true,
      statusCode: StatusCode.SUCCESS,
      message: "User fetched successfully",
      data: {
        email: "ibuolatobi@gmail.com",
        id: "1",
      },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
