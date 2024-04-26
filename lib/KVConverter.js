"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class KVConverter {
    convertKVToJSON(filename) {
        const json = {};
        const filePath = path_1.default.join(process.cwd(), filename);
        fs_1.default.readFileSync(filePath, 'utf8')
            .split('\n')
            .forEach((line) => {
            const [key, value] = line.trim().split('=');
            const keyParts = key.split('.');
            let currentObject = json;
            for (let i = 0; i < keyParts.length - 1; i++) {
                const keyPart = keyParts[i];
                if (!currentObject[keyPart]) {
                    currentObject[keyPart] = {};
                }
                currentObject = currentObject[keyPart];
            }
            currentObject[keyParts[keyParts.length - 1]] = value;
        });
        return json;
    }
}
exports.default = KVConverter;
