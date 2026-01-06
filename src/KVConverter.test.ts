import KVConverter from "./KVConverter";

describe('KV Converter', () => {
    test('Reads a prop file and returns a JSON object', async () => {
        const converter = new KVConverter();
        const result = await converter.convertKVFileToJSON("test.prop");

        expect(result).toBeTruthy();
        console.log(JSON.stringify(result));
        expect(result.testkey.key1).toBe('somevalue');
        expect(result.testkey.key2).toBe('someOtherValue');
        expect(result.testkey.key3.subkey).toBe('someThirdValue');
    });

    test('Converts a string of key-value pairs to a JSON object', () => {
        const converter = new KVConverter();
        const result = converter.convertKeyValuesToJSON("testkey.subkey.keyA=valA\r\ntestkey.subkey.keyB=valB\r\ntestkey.anotherKey=valC");

        expect(result).toBeTruthy();
        console.log(JSON.stringify(result));
        expect(result.testkey.subkey.keyA).toBe('valA');
        expect(result.testkey.subkey.keyB).toBe('valB');
        expect(result.testkey.anotherKey).toBe('valC');
    });

    test('Converts a string of key-value pairs, some of which define an array, to a JSON object', () => {
        const converter = new KVConverter();
        const result = converter.convertKeyValuesToJSON("testkey.subkey[0].keyA=valA\r\ntestkey.subkey[0].keyB=valB\r\ntestkey.subkey[1].keyA=valC\r\ntestkey.subkey[1].keyB=valD");

        expect(result).toBeTruthy();
        console.log(JSON.stringify(result));
        expect(result.testkey.subkey[0].keyA).toBe('valA');
        expect(result.testkey.subkey[0].keyB).toBe('valB');
        expect(result.testkey.subkey[1].keyA).toBe('valC');
        expect(result.testkey.subkey[1].keyB).toBe('valD');
    });

    test('Skip over malformed array keys', () => {
        const converter = new KVConverter();
        const result = converter.convertKeyValuesToJSON("testkey.subkey[0=somevalue\r\ntestkey.subkey[0]=someOtherValue");
        console.log(JSON.stringify(result));
        expect(result.testkey.subkey[0]).toBe('someOtherValue');
    });

    test('Throws an error when given an invalid file', async () => {
        const converter = new KVConverter();
        await expect(converter.convertKVFileToJSON("invalid.prop")).rejects.toThrow();
    });

    test('Throws an error when given an invalid string', () => {
        const converter = new KVConverter();
        expect(() => converter.convertKeyValuesToJSON("invalidprop")).toThrowError();
    });



});