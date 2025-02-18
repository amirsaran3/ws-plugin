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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupKeypom = void 0;
var keypom_lib_1 = require("./keypom-lib");
var icons_1 = require("../assets/icons");
var Keypom = function (_a) {
    var options = _a.options, metadata = _a.metadata, store = _a.store, provider = _a.provider, emitter = _a.emitter, logger = _a.logger;
    return __awaiter(void 0, void 0, void 0, function () {
        var isValidActions, transformActions;
        return __generator(this, function (_b) {
            (0, keypom_lib_1.initConnection)(options.network);
            isValidActions = function (actions) {
                return actions.every(function (x) { return x.type === "FunctionCall"; });
            };
            transformActions = function (actions) {
                var validActions = isValidActions(actions);
                if (!validActions) {
                    throw new Error("Only 'FunctionCall' actions types are supported by ".concat(metadata.name));
                }
                return actions.map(function (x) { return x.params; });
            };
            // return the wallet interface for wallet-selector
            return [2 /*return*/, {
                    signIn: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var account;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, keypom_lib_1.signIn)()];
                                    case 1:
                                        account = _a.sent();
                                        return [2 /*return*/, [account]];
                                }
                            });
                        });
                    },
                    signOut: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_a) {
                                res = (0, keypom_lib_1.signOut)();
                                return [2 /*return*/, res];
                            });
                        });
                    },
                    verifyOwner: function (_a) {
                        var message = _a.message;
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                logger.log("Keypom:verifyOwner", { message: message });
                                return [2 /*return*/, {
                                        accountId: 'string',
                                        message: 'string',
                                        blockId: 'string',
                                        publicKey: 'string',
                                        signature: 'string',
                                        keyType: 0,
                                    }];
                            });
                        });
                    },
                    getAccounts: function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var accountId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, (0, keypom_lib_1.getAccount)()];
                                    case 1:
                                        accountId = (_a.sent()).accountId;
                                        return [2 /*return*/, [{ accountId: accountId }]];
                                }
                            });
                        });
                    },
                    signAndSendTransaction: function (_a) {
                        var receiverId = _a.receiverId, actions = _a.actions;
                        return __awaiter(this, void 0, void 0, function () {
                            var res;
                            return __generator(this, function (_b) {
                                logger.log("Keypom:signAndSendTransaction", {
                                    receiverId: receiverId,
                                    actions: actions,
                                });
                                try {
                                    res = (0, keypom_lib_1.signAndSendTransactions)({
                                        transactions: [
                                            {
                                                receiverId: receiverId,
                                                actions: transformActions(actions),
                                            },
                                        ],
                                    });
                                }
                                catch (e) {
                                    /// user cancelled or near network error
                                    console.warn(e);
                                }
                                return [2 /*return*/, res[0]];
                            });
                        });
                    },
                    signAndSendTransactions: function (_a) {
                        var transactions = _a.transactions;
                        return __awaiter(this, void 0, void 0, function () {
                            var res, e_1;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        logger.log("Keypom:signAndSendTransactions", { transactions: transactions });
                                        _b.label = 1;
                                    case 1:
                                        _b.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, (0, keypom_lib_1.signAndSendTransactions)({
                                                transactions: transactions,
                                            })];
                                    case 2:
                                        res = _b.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        e_1 = _b.sent();
                                        /// user cancelled or near network error
                                        console.warn(e_1);
                                        return [3 /*break*/, 4];
                                    case 4: return [2 /*return*/, res];
                                }
                            });
                        });
                    },
                }];
        });
    });
};
function setupKeypom(_a) {
    var _this = this;
    var _b = _a === void 0 ? {} : _a, _c = _b.iconUrl, iconUrl = _c === void 0 ? icons_1.nearWalletIcon : _c, _d = _b.deprecated, deprecated = _d === void 0 ? false : _d;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, keypom_lib_1.autoSignIn)()
                    // await waitFor(() => !!window.near?.isSignedIn(), { timeout: 300 }).catch(() => false);
                ];
                case 1:
                    _a.sent();
                    // await waitFor(() => !!window.near?.isSignedIn(), { timeout: 300 }).catch(() => false);
                    return [2 /*return*/, {
                            id: "keypom",
                            type: "injected",
                            metadata: {
                                name: "Keypom Account",
                                description: null,
                                iconUrl: iconUrl,
                                downloadUrl: "https://example.com",
                                deprecated: deprecated,
                                available: true,
                            },
                            init: Keypom,
                        }];
            }
        });
    }); };
}
exports.setupKeypom = setupKeypom;
