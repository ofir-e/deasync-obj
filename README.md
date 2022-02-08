# deasync-obj

 transforms object with promises values to object with resolved values.

## Installation

    npm install deasync-obj

(typescript ready, no need for @types/deasync-obj :))

## Example

~~~ javascript
import { deasyncObj } from 'deasync-obj';

async function main() {
    const obj = {
        foo: {
            bar: Promise.resolve(5),
            baz: [6, Promise.resolve(7)]
        }
    };

    deasyncObj(obj).then(() => {
        console.log(obj);
    });


}

main();
~~~

This will print:

~~~ javascript
{ foo: { bar: 5, baz: [6, 7] } }
~~~