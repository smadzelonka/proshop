import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

/**
 * @desc Create a new order
 * @route POST/ API/orders
 * @ACCESS Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  console.log(orderItems);
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

/**
 * @desc Get an order
 * @route GET API/orders/:id
 * @ACCESS Private
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email",
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

/**
 * @desc Update an existing order
 * @route PUT API/orders/:id/pay
 * @ACCESS Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

/**
 * @desc Get Logged in user order
 * @route GET api/orders/myorders
 * @ACCESS Private
 */
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/**
 * @desc Get All order
 * @route GET api/orders
 * @ACCESS Private/Admin
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
});

/**
 * @desc Update order to delievered
 * @route GET API/orders/:id/deliver
 * @ACCESS Private/admin
 */
const updateOrderToDelievered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("order not found");
  }
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getUserOrders,
  getOrders,
  updateOrderToDelievered,
};
