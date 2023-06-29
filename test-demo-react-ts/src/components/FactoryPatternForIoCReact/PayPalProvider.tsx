import { PaymentProviderServiceInterface } from "../../Providers/Payment/PaymentProviderServiceInterface";

export const PayPalProvider = ({
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
      <h2>PayPal</h2>
      <button type="submit">Pay</button>
    </form>
  );
};
