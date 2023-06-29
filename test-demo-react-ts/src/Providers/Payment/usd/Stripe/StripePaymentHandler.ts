import { StripeUtils } from "../../../../utils/StripeUtils";

export class StripePaymentHandler {
  makePayment = async () => {
    const { data } = await StripeUtils.connectApi();
    if (data) {
      return {};
    }
    return undefined;
  };
}
