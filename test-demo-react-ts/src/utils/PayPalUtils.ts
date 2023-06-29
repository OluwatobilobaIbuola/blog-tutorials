import axios from "axios";

export class PayPalUtils {
  static connectApi = async () => {
    const { data } = await axios.get("https://api.paypal.com/v1/charges");
    console.log(data);
    return data;
  };
}
