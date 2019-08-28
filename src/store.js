import createStore from "unistore";

const initialState = {
  is_login: false,
  cartProduct: [],
  transaction_id: 0,
  host: "https://api.adesphone.xyz"
};

export const store = createStore(initialState);

export const actions = store => ({
  setCart: (state, baru) => {
    store.setState({ cartProduct: baru });
  },
  setTransactionID: (state, baru) => {
    store.setState({ transaction_id: baru });
  }
});
