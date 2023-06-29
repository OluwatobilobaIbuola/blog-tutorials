import { Provider } from "../../enums/Provider";
import { JSXElementConstructor } from "react";
import { PaymentProviderServiceInterface } from "../Payment/PaymentProviderServiceInterface";
import { StripeProvider } from "../../components/FactoryPatternForIoCReact/StripeProvider";
import { PayPalProvider } from "../../components/FactoryPatternForIoCReact/PayPalProvider";

export class ProviderComponentFactory {
  public getFactoryMap(): Record<
    string,
    JSXElementConstructor<PaymentProviderServiceInterface>
  > {
    let componentProviderMap: Record<
      string,
      JSXElementConstructor<PaymentProviderServiceInterface>
    > = {};
    ProviderComponentFactory.addService(
      Provider.PAYPAL,
      componentProviderMap,
      PayPalProvider
    );
    ProviderComponentFactory.addService(
      Provider.STRIPE,
      componentProviderMap,
      StripeProvider
    );
    return componentProviderMap;
  }

  private static addService(
    key: Provider,
    componentProviderMap: Record<
      string,
      JSXElementConstructor<PaymentProviderServiceInterface>
    >,
    providerComponent: JSXElementConstructor<PaymentProviderServiceInterface>
  ) {
    componentProviderMap[key] = providerComponent;
  }
}
