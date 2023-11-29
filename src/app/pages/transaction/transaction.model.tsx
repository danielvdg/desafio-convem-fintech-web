export class TransactionModel {
  constructor(
    public idempotencyId: string,
    public amount: number,
    public type: string,
  ) {}
}

export default TransactionModel;
