"use strict";

/**
 * @param {number} [operationsLimit=0] threshold, when exceeded 'execute' func automatically called
 */
function ActionsBulkManager(operationsLimit = 5) {
  if (typeof operationsLimit !== "number")
    throw new Error("operationsLimit must be number");

  this.operations = [];
  this.limit = operationsLimit;

  this.execute = async () => {
    if (this.operations.length === 0) {
      throw new Error("Sorry you have to add some operations first");
    }
    const theOps = this.operations;
    this.operations = [];
    await Promise.all(
      theOps.map(async (operation) => {
        return await operation;
      })
    );
  };

  this.add = async (operation) => {
    this.operations.push(operation);
    if (this.operations.length >= this.limit) {
      this.execute();
    }
  };

  // Always call this upon completion to make sure the final partial chunk is saved.
  this.done = async () => {
    if (this.operations.length > 0) {
      await this.execute();
    }
  };
}

module.exports = ActionsBulkManager;
