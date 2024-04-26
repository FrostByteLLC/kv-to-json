import fs from 'fs';
import path from 'path';


class KVConverter {

    private getOSLineSeparator(): string {
        return process.platform === 'win32' ? '\r\n' : '\n';
    }


    /**
     * Given a string of key-value pairs separated by newlines, checks if the string is a valid key-value string
     * 
     * @param kvString a string containing the key-value pairs. Assumed a newline character separates pairs
     * @returns true if the string is a valid key-value string, false otherwise
     */
    private validateStringIsKeyValuePairs(kvString: string): boolean {
        return kvString.split(this.getOSLineSeparator()).every((line) => {
            return line.trim().split('=').length === 2;
        });
    }

    /**
     * Given a string of key-value pairs separated by newlines, where keys can have multiple parts separated by a delimiter, converts it into a nested JSON object,
     * where each key becomes a nested object.
     * 
     * As an example, given a list of key-value pairs 
     * 
     * testkey.subkey.keyA=valA
     * testkey.subkey.keyB=valB
     * testkey.anotherKey=valC
     * 
     * Would a return a JSON object
     * {
     *   "testkey":{
     *      "subkey": {
     *         "keyA": "valA",
     *         "keyB": "valB"
     *      },
     *      "anotherKey": "valC" 
     *   }
     * }
     * 
     * Additionall, array notation can be used to define arrays. For example, given the key-value pairs
     * 
     * testkey.subkey.keyA[0]=valA
     * testkey.subkey.keyA[1]=valB
     * testkey.subkey.keyA[2]=valC
     * 
     * Would return a JSON object
     * {
     *   "testkey":{
     *      "subkey": {
     *         "keyA": ["valA", "valB", "valC"]
     *      }
     *   }
     * }
     * 
     * @param kvString a string containing the key-value pairs. Assumed a newline character separates pairs
     * @param delimiter the delimiter used in representing structure. Defaults to '.'
     * @throws Error if the string is not a valid key-value string
     * @returns a JSON representation of the key-value structure
     */
    public convertKeyValuesToJSON(keyValuePairs: string, delimiter?: string): any {
        
        if (!this.validateStringIsKeyValuePairs(keyValuePairs)) {
            throw new Error("Invalid key-value string");
        }

        const lines = keyValuePairs.split(this.getOSLineSeparator());

        const result = {};

        lines.forEach((line) => {
            const parts = line.trim().split('=');
            const keyParts = parts[0].split(delimiter || '.');

            let currentObj:any = result;

            for (let i = 0; i < keyParts.length; i++) {
                const keyPart = keyParts[i];

                if (keyPart.includes('[')) {
                    const key = keyPart.substr(0, keyPart.indexOf('['));
                    const index = parseInt(keyPart.substring(keyPart.indexOf('[') + 1, keyPart.indexOf(']')));
                    if (!currentObj[key]) {
                        currentObj[key] = [];
                    }

                    if (i === keyParts.length - 1) {
                        currentObj[key][index] = parts[1];
                    } else {
                        if (!currentObj[key][index]) {
                            currentObj[key][index] = {};
                        }
                        currentObj = currentObj[key][index];
                    }
                } else {
                    if (i === keyParts.length - 1) {
                        currentObj[keyPart] = parts[1];
                    } else {
                        if (!currentObj[keyPart]) {
                            currentObj[keyPart] = {};
                        }
                        currentObj = currentObj[keyPart];
                    }
                }
            }
        });

        return result;
    }

    
    /**
     * Given a file containing key-value pairs separated by newlines, where keys can have multiple parts separated by a delimiter, converts it into a nested JSON object,
     * where each key becomes a nested object.
     * 
     * As an example, given a list of key-value pairs in a file
     * testkey.subkey.keyA=valA
     * testkey.subkey.keyB=valB
     * testkey.anotherKey=valC
     *      
     * Would a return a JSON object
     * {
     *  "testkey":{
     *     "subkey": {
     *       "keyA": "valA",
     *       "keyB": "valB"
     *    },
     *   "anotherKey": "valC"
     * }
     * 
     * Additionall, array notation can be used to define arrays. For example, given the key-value pairs
     * 
     * testkey.subkey.keyA[0]=valA
     * testkey.subkey.keyA[1]=valB
     * testkey.subkey.keyA[2]=valC
     * 
     * Would return a JSON object
     * {
     *  "testkey":{
     *    "subkey": {
     *     "keyA": ["valA", "valB", "valC"]
     *   }
     * }
     * 
     *  
     * @param filename the name of the file containing the key-value pairs
     * @param delimiter the delimiter used in representing structure. Defaults to '.'
     * @returns a JSON representation of the key-value structure
     * 
     * @throws Error if the file does not exist
     * @throws Error if the file cannot be read
     * @throws Error if the file is not a valid key-value file
     */
    public convertKVFileToJSON(filename: string, delimiter?: string): any {

        const filePath = path.join(process.cwd(), filename);
        return this.convertKeyValuesToJSON(fs.readFileSync(filePath, "utf8"), delimiter || '.');
    }


}

export default KVConverter;