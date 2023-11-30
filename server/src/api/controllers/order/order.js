import HttpException from '../../exceptions/http-exception';
import { sequelize } from '../../models';

const crypto = require('crypto');

const db = require('../../models');
const Order = db.orders;
const Goods = db.goods;
const Customer = db.customers;
const Address = db.addresses;

export const getAllOrders = async (req, res) => {
    const orders = await Order.findAll();
    console.log(`Random number chosen from (0, 1, 2): ${generateOrderID()}`);
    return res.status(200).json(orders)
}

export const createOrder = async (req, res) => {
    let order = JSON.parse(JSON.stringify(req.body.order));
    let savePoint = JSON.parse(JSON.stringify(req.body));

    let goodsList = req.body.goodsList;

    order.orderID = generateOrderID();
    order.creatorID = req.user.employeeID;

    order.startTransactionPointID = req.user.workingPointID;
    order.endTransactionPointID = "46"

    const t = await sequelize.transaction();
    try {
        let senderAddress = await Address.create(req.body.order.sender.address, { transaction: t });
        let receiverAddress = await Address.create(req.body.order.receiver.address, { transaction: t });

        let sender = req.body.order.sender;
        let receiver = req.body.order.receiver;
        sender.addressID = senderAddress.dataValues.addressID;
        receiver.addressID = receiverAddress.dataValues.addressID;

        delete sender.address;
        delete receiver.address;

        sender = await Customer.create(sender, { transaction: t });
        receiver = await Customer.create(receiver, { transaction: t });

        order.senderID = sender.dataValues.customerID;
        order.receiverID = receiver.dataValues.customerID;

        delete order.sender;
        delete order.receiver;

        order = await Order.create(order, { transaction: t });
        for (const goods of goodsList) {
            let clone = JSON.parse(JSON.stringify(goods));
            clone.orderID = order.dataValues.orderID;
            await Goods.create(clone, { transaction: t });
        }
        await t.commit();

        savePoint.order.orderID = order.orderID;
        savePoint.order.startTransactionPointID = order.startTransactionPointID;
        savePoint.order.endTransactionPointID = order.endTransactionPointID;
        savePoint.order.creatorID = order.creatorID;
        savePoint.order.createdAt = order.createdAt;
        savePoint.order.updatedAt = order.updatedAt;

        return res.status(200).json(savePoint);
    } catch (error) {
        await t.rollback();
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function generateOrderID() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndexes = crypto.randomBytes(3);
    let orderID = alphabet[randomIndexes[0] % 26]
        + alphabet[randomIndexes[1] % 26]
        + alphabet[randomIndexes[2] % 26];
    orderID += crypto.randomInt(100000000, 999999999).toString() + "VN";
    return orderID;
}