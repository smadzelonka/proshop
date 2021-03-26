const url = "/api/products";

// home screens
/**
 * Fetches all products
 * */
// can make a class and set static will do later
const fetchedProducts = async () => {
  const { data } = await axios.get(url);
  setProducts(data);
};

// Product Screen
const fetchedProduct = async () => {
  const { data } = await axios.get(`${url}${match.params.id}`);
  setProduct(data);
};
