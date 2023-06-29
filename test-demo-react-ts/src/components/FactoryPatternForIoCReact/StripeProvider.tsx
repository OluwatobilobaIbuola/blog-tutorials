import { PaymentProviderServiceInterface } from "../../Providers/Payment/PaymentProviderServiceInterface";

export const StripeProvider = ({
  makePayment,
}: PaymentProviderServiceInterface) => {
  let paypal: any;
  const handlePayment = (e: any) => {
    e.preventDefault();
    makePayment();
  };

  return (
    <form onSubmit={handlePayment}>
      {/* <PayPalForm /> */}
      <h2>Stripe</h2>
      <button type="submit">Pay</button>
    </form>
  );
};
