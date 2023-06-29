import { PayPalUtils } from "../../../../utils/PayPalUtils";

export class PayPalPaymentHandler {
  makePayment = async () => {
    const { data } = await PayPalUtils.connectApi();
    if (data) {
      return {};
    }
    return undefined;
  };
}
