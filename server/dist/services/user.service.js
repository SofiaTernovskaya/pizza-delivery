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
var encryptionUtils_1 = require("../utilities/encryptionUtils");
var apiUtilities_1 = require("../utilities/apiUtilities");
var user_entity_1 = require("../entities/user/user.entity");
var getUserById = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = apiUtilities_1.sanitizeUser;
                return [4 /*yield*/, typeorm_1.getRepository(user_entity_1.User).findOne({ id: userId })];
            case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            case 2:
                e_1 = _b.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var getUserByEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(user_entity_1.User).findOne({ email: email })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                e_2 = _a.sent();
                return [2 /*return*/, null];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createUser = function (userData) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, password, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                newUser = new user_entity_1.User();
                return [4 /*yield*/, encryptionUtils_1.generateHash(userData.password, 10)];
            case 1:
                password = _b.sent();
                Object.assign(newUser, userData, {
                    password: password
                });
                _a = apiUtilities_1.sanitizeUser;
                return [4 /*yield*/, typeorm_1.getRepository(user_entity_1.User).save(newUser)];
            case 2: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
        }
    });
}); };
var updateUser = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(user_entity_1.User).save(user)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var loginUser = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getUserByEmail(email)];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                return [4 /*yield*/, encryptionUtils_1.verifyHash(password, user.password)];
            case 2:
                if (_a.sent()) {
                    updateUser(user);
                    return [2 /*return*/, apiUtilities_1.sanitizeUser(user)];
                }
                _a.label = 3;
            case 3: return [2 /*return*/, null];
        }
    });
}); };
exports["default"] = {
    createUser: createUser,
    loginUser: loginUser,
    getUserById: getUserById
};
