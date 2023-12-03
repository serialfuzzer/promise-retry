# @chriscdn/promise-retry

Retry an asynchronous function until it resolves successfully or exceeds the maximum attempt count.

## Installing

Using npm:

```bash
$ npm install @chriscdn/promise-retry
```

Using yarn:

```bash
$ yarn add @chriscdn/promise-retry
```

## Example 1 - Promises

```js
import promiseRetry from "@chriscdn/promise-retry";

function myFunction(attempt) {
  return new Promise((resolve, reject) => {
    // ... do something

    if (allIsFine) {
      resolve(/* <value> */);
    } else {
      reject(/* <err> */);
    }
  });
}

const options = {
  maxAttempts: 10,
  retryDelay: 0,
  onError: (err, attempt) => {},
};

// Call myFunction until a resolved promise is returned, but not more than 10 times (default is 10)
promiseRetry((attempt) => myFunction(attempt), options)
  .then((value) => {
    // myFunction resolved within 10 attempts
    // value is from the myFunction resolve call
  })
  .catch((err) => {
    // myFunction failed to return a resolved promise within 10 attempts
    // err is the reject value from the last attempt
  });
```

## Example 2 - Async/Await

```js
import promiseRetry from "@chriscdn/promise-retry";

const results = await promiseRetry(
  async (attempt) => {
    // do something async in here
  },
  {
    maxAttempts: 10,
    retryDelay: 0,
    onError: (err, attempt) => {
      // log the error
    },
  }
);
```


## Example 3 -- Async/Await
```js
var promiseRetry = require('@chriscdn/promise-retry');
var counter = 1;

async function errorFunc(x) {
    console.log("attempt", x)
        if(counter==3){
            return 3;
        }else{
            counter++
            throw new Error('Err');    
        }
}


async function main() {
    
    const results = await promiseRetry(errorFunc,
        {
            maxAttempts: 10,
            retryDelay: 0,
        }
        );
        console.log(results)
}

main();
```

## License

[MIT](LICENSE)
