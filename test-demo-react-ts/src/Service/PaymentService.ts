import { PaymentProviderServiceInterface } from "../Providers/Payment/PaymentProviderServiceInterface";
import { UsdPaymentProviderFactory } from "../Providers/Payment/usd/UsdPaymentProviderFactory";
import { AllowedCurrencies } from "../enums/AllowedCurrencies";
import { Provider } from "../enums/Provider";

export class PaymentService {
  public makePayment(
    selectedProvider: Provider,
    currency: AllowedCurrencies
  ): PaymentProviderServiceInterface {
    const providerFactoryMap =
      PaymentService.getProviderFactoryMapByCurrency(currency);
    const providerService: PaymentProviderServiceInterface =
      providerFactoryMap[selectedProvider];
    return providerService;
  }

  private static getProviderFactoryMapByCurrency(
    currency: string
  ): Record<string, PaymentProviderServiceInterface> {
    switch (currency) {
      case AllowedCurrencies.NGN:
        return {};
      case AllowedCurrencies.USD:
        return new UsdPaymentProviderFactory().getFactoryMap();
      default:
        return {};
    }
  }
}
