import { useState } from "react";
import { PaymentService } from "../../Service/PaymentService";
import { CheckoutComponent } from "./CheckoutComponent";
import { Provider } from "../../enums/Provider";
import { AllowedCurrencies } from "../../enums/AllowedCurrencies";
import { ProviderComponentFactory } from "../../Providers/Component/ProviderComponentFactory";

export const CheckoutContainer = () => {
  const [selectedProvider, setSelectedProvider] = useState<Provider>(
    Provider.PAYPAL
  );
  const [currency, setCurrency] = useState<AllowedCurrencies>(
    AllowedCurrencies.USD
  );
  return (
    <CheckoutComponent
      providerComponent={
        new ProviderComponentFactory().getFactoryMap()[selectedProvider]
      }
      selectedProvider={selectedProvider}
      currency={currency}
    />
  );
};
