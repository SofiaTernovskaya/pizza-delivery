"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var order_entity_1 = require("../entities/order/order.entity");
var order_item_entity_1 = require("../entities/order/order_item.entity");
var product_entity_1 = require("../entities/product/product.entity");
var delivery_entity_1 = require("../entities/delivery/delivery.entity");
var createOrder = function (name, phoneNumber, address, productItems, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var newOrder, deliveryPrice, productPrices;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newOrder = new order_entity_1.Order();
                _a = [
                    name,
                    phoneNumber,
                    address,
                ], newOrder.user_name = _a[0], newOrder.user_phone_number = _a[1], newOrder.user_address = _a[2];
                return [4 /*yield*/, typeorm_1.getRepository(delivery_entity_1.Delivery).findOne()];
            case 1:
                deliveryPrice = _b.sent();
                newOrder.delivery_usd = deliveryPrice.delivery_usd;
                newOrder.delivery_eur = deliveryPrice.delivery_eur;
                newOrder.user = { id: userId };
                return [4 /*yield*/, typeorm_1.getRepository(product_entity_1.Product).findByIds(productItems.map(function (item) { return item.id; }), {
                        select: ["id", "price_usd", "price_eur"]
                    })];
            case 2:
                productPrices = _b.sent();
                newOrder.order_items = productItems.map(function (_a) {
                    var id = _a.id, quantity = _a.quantity;
                    var newOrderItem = new order_item_entity_1.OrderItem();
                    newOrderItem.product = [{ id: id }];
                    newOrderItem.quantity = quantity;
                    newOrderItem.price_usd = productPrices.find(function (item) { return item.id === id; }).price_usd;
                    newOrderItem.price_eur = productPrices.find(function (item) { return item.id === id; }).price_eur;
                    return newOrderItem;
                });
                return [4 /*yield*/, typeorm_1.getRepository(order_entity_1.Order).save(newOrder)];
            case 3: return [2 /*return*/, _b.sent()];
        }
    });
}); };
var getOrders = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(order_entity_1.Order)
                    .createQueryBuilder("order")
                    .orderBy("order.order_date", "DESC")
                    .leftJoinAndSelect("order.order_items", "items")
                    .leftJoinAndSelect("items.product", "product")
                    .where("order.user=:user_id", { user_id: userId })
                    .getMany()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var getOrderById = function (orderId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(order_entity_1.Order)
                    .createQueryBuilder("order")
                    .leftJoinAndSelect("order.order_items", "items")
                    .leftJoinAndSelect("items.product", "product")
                    .where("order.id=:order_id", { order_id: orderId })
                    .getOne()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports["default"] = {
    createOrder: createOrder,
    getOrders: getOrders,
    getOrderById: getOrderById
};
