import axios from "axios";

export class StripeUtils {
  static connectApi = async () => {
    const { data } = await axios.get("https://api.stripe.com/v1/charges");
    console.log(data);
    return data;
  };
}
