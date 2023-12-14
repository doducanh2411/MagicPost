import { Router } from "express";
import { getAllTransactionPoints, getTransactionPointsByAddress } from "../../controllers/routing_point/transaction_point";

const { default: catchAsync } = require("../../exceptions/catch-async");

const transactionPointRoute = new Router();

transactionPointRoute.get("/getAll", catchAsync(getAllTransactionPoints));
transactionPointRoute.get("/get", catchAsync(getTransactionPointsByAddress));

export default transactionPointRoute;