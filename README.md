# kv-to-json

## Overview
kv-to-json is a library that converts key-value pairs into JSON format. It provides a simple and efficient way to transform data from a key-value format to a structured JSON representation.

For example, given a prop file containing

```
testkey.subkey.keyA[0]=valA
testkey.subkey.keyA[1]=valB
testkey.subkey.keyA[2]=valC
```

Would return a JSON object

```
{
    "testkey":{
        "subkey": {
            "keyA": ["valA", "valB", "valC"]
        }
    }
}
```

## Installation
To add kv-to-json to your package.json, run the following command in your terminal:

```npm install kv-to-json --save```


## Usage
The main (and only) class in kv-to-json is the KVConverter class. To convert a .prop file to a JSON object, it can be used as follows:

```
const converter: KVConverter = new KVConverter();
const result:any = converter.convertKVFileToJSON('/path/to/your/file.prop')
```
This will read the contents of file.prop and turn it into a structured JSON object, assuming a '.' as the delimiter in key values. This can be overriden by providing your own delimiter to the function, like so:

```
const converter: KVConverter = new KVConverter();
const result:any = converter.convertKVFileToJSON('/path/to/your/file.prop', ':');
```

The library also supports converting string objects directly, so long as they are formatted correctly (key-value pairs, proper carriage returns, etc...). This is done with the convertKeyValuesToJSON function:

```
const converter: KVConverter = new KVConverter();
const result:any = converter.convertKeyValuesToJSON('somekey.subkey=value\r\nsomeOtherKey.sub[0]=someOtherValue')
```

returns 

```
{
    someKey:{
        subkey: 'value'
    },
    someOtherKey:{
        sub:['someOtherValue']
    }
}

```

```
const converter: KVConverter = new KVConverter();
const result:any = converter.convertKeyValuesToJSON('somekey:subkey=value\r\nsomeOtherKey:sub[0]=someOtherValue', ':');
```
Also returns

```
{
    someKey:{
        subkey: 'value'
    },
    someOtherKey:{
        sub:['someOtherValue']
    }
}

```