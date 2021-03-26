import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: null,
});

/**
 * products
 * */
export const productsListState = atom({
  key: "productsListState",
  default: [],
});

/**
 * a single product
 * */

export const productListState = atom({
  key: "productListState",
  default: [],
});

/**
 * cart Not used get but will houes shipping address cartliststate
 * & other Order things to be ready
 * to be sent out
 * */

export const cartOrderState = atom({
  key: "cartOrderState",
  default: [],
});

/**
 * cart list
 * */

export const cartListState = atom({
  key: "cartListState",
  default: [],
});

/**
 * Shopping list address
 * */

export const shippingAddressState = atom({
  key: "shippingAddressState",
  default: [],
});

export const paymentMethodState = atom({
  key: "paymentMethodState",
  default: [],
});

// Daltons code
// export const userState = atom({
//   key: "userState",
//   default: null,
// });
