import { useState, JSXElementConstructor, useMemo } from "react";
import { Provider } from "../../enums/Provider";
import { AllowedCurrencies } from "../../enums/AllowedCurrencies";
import { PaymentService } from "../../Service/PaymentService";
import { PaymentProviderServiceInterface } from "../../Providers/Payment/PaymentProviderServiceInterface";
interface ComponentProps {
  providerComponent: JSXElementConstructor<PaymentProviderServiceInterface>;
  selectedProvider: Provider;
  currency: AllowedCurrencies;
}

export const CheckoutComponent = ({
  providerComponent: ProviderComponent,
  selectedProvider,
  currency,
}: ComponentProps) => {
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", price: 100 },
    { id: 2, name: "Product 2", price: 200 },
  ]);
  const total = useMemo(() => 10000, []);
  return (
    <div>
      <div>
        Products:
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - U${product.price}
            </li>
          ))}
        </ul>
        <p>Total: U${total}</p>
      </div>
      <ProviderComponent
        makePayment={
          new PaymentService().makePayment(selectedProvider, currency)
            .makePayment
        }
      />
    </div>
  );
};
