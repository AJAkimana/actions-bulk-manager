"use strict";

/**
 * @param {number} [operationsLimit=0] threshold, when exceeded 'execute' func automatically called
 */
function ActionsBulkManager(operationsLimit = 5) {
  if (typeof operationsLimit !== "number")
    throw new Error("operationsLimit must be number");

  const operations = [];
  const limit = operationsLimit;

  this.execute = async () => {
    await Promise.all(
      operations.map(async (operation) => {
        await operation;
      })
    );

    operations.length = 0;
  };

  this.add = async (operation) => {
    operations.push(operation);
    if (operations.length >= limit) {
      await this.execute();
    }
  };

  // Always call this upon completion to make sure the final partial chunk is saved.
  this.done = async () => {
    if (operations.length) {
      await this.execute();
    }
  };
}

module.exports = ActionsBulkManager;
