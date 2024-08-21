export const initializePaystackPayment = ({
  email,
  amount,
  reference,
  onSuccess,
  onClose,
}) => {
  const publicKey = "pk_test_5dc519bd007cb7ea404538e1630f8337b0b5b3aa";
  if (!publicKey) {
    return;
  }

  const handler = window.PaystackPop.setup({
    key: publicKey,
    email: email,
    amount: amount * 100,
    currency: "ZAR",
    ref: reference || `${Math.floor(Math.random() * 1000000000)}`,
    callback: onSuccess,
    onClose: onClose,
  });
  handler.openIframe();
};
