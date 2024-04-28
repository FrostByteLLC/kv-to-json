declare class KVConverter {
    private getOSLineSeparator;
    /**
     * Given a string of key-value pairs separated by newlines, checks if the string is a valid key-value string
     *
     * @param kvString a string containing the key-value pairs. Assumed a newline character separates pairs
     * @returns true if the string is a valid key-value string, false otherwise
     */
    private validateStringIsKeyValuePairs;
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
    convertKeyValuesToJSON(keyValuePairs: string, delimiter?: string): any;
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
    convertKVFileToJSON(filename: string, delimiter?: string): any;
}
export default KVConverter;
