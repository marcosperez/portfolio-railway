"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectWithTheSameFields = void 0;
const jest_mock_extended_1 = require("jest-mock-extended");
const lodash_1 = require("lodash");
const objectWithTheSameFields = (expectedValue) => new jest_mock_extended_1.Matcher((actualValue) => {
    return (0, lodash_1.isEqual)(actualValue, expectedValue);
}, "different fields");
exports.objectWithTheSameFields = objectWithTheSameFields;
