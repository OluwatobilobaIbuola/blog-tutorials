import { StatusCode } from "@/enums/httpStatusCode";
import { NextApiRequest, NextApiResponse } from "next";
const users = [
  { email: "ibuolatobi@gmail.com", password: "Admin@1234" },
  { email: "sunmisolaalawusa@gmail.com", password: "Admin@1234" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!password || !email) {
      res.status(StatusCode.BAD_REQUEST).json({
        status: false,
        statusCode: StatusCode.BAD_REQUEST,
        message: "Email or password field are required",
        data: null,
      });
      return;
    }

    const user = users.find((user) => user.email === email);

    if (!user) {
      res.status(StatusCode.NOT_FOUND).json({
        status: false,
        statusCode: StatusCode.NOT_FOUND,
        message: "User not found",
        data: null,
      });
      return;
    }
    if (user?.password !== password) {
      res.status(StatusCode.BAD_REQUEST).json({
        status: false,
        statusCode: StatusCode.BAD_REQUEST,
        message: "Please provide a valid email or password",
        data: null,
      });
      return;
    }
    res.status(StatusCode.CREATED).json({
      status: true,
      statusCode: StatusCode.CREATED,
      message: "Login successfully",
      data: { email: user.email, id: "1", token: "qwertyuiopasdfghjklzxcvbnm" },
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
