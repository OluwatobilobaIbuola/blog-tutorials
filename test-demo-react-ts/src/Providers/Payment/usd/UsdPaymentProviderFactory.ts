import { Provider } from "../../../enums/Provider";
import { PaymentProviderServiceInterface } from "../PaymentProviderServiceInterface";
import { PayPalPaymentHandler } from "./PayPal/PayPalPaymentHandler";
import { StripePaymentHandler } from "./Stripe/StripePaymentHandler";

export class UsdPaymentProviderFactory {
  public getFactoryMap(): Record<string, PaymentProviderServiceInterface> {
    let paymentProviderMap: Record<string, PaymentProviderServiceInterface> =
      {};
    UsdPaymentProviderFactory.addService(
      Provider.PAYPAL,
      paymentProviderMap,
      new PayPalPaymentHandler()
    );
    UsdPaymentProviderFactory.addService(
      Provider.STRIPE,
      paymentProviderMap,
      new StripePaymentHandler()
    );
    return paymentProviderMap;
  }

  private static addService(
    key: Provider,
    paymentProviderService: Record<string, PaymentProviderServiceInterface>,
    providerService: PaymentProviderServiceInterface
  ) {
    paymentProviderService[key] = providerService;
  }
}
