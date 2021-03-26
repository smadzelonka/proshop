const URL = "http://localhost:5000/api/orders";
class OrderModel {
  static placeOrder = (data) => {
    return fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.uid}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };
  static getMyOrder = (data) => {
    return fetch(`${URL}/myorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.uid}`,
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  };
}

export default OrderModel;
