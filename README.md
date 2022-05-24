A promise based Actions bulk manager

## Installation

```bash
$ npm i actions-bulk-manager
```

## Usage

```js
const BulkManager = require("actions-bulk-manager");

// {number} threshold, when exceeded 'execute' func automatically called (0 by default, which means no automatic execution)
const operationsLimit = 10;

const bulk = new BulkManager(operationsLimit);

const p1 = new Promise.resolve(1 + 5);
const p2 = new Promise.resolve(3 + 5);

const operations = [p1, p2];

operations.map((operation) => {
  bulk.add(operation);
});
// You need to call `done()` after the array execution
bulk.done();
```
