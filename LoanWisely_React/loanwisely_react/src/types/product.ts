// Product API types.
export type LoanProduct = {
  productId: number;
  providerId?: number;
  productName: string;
  companyName?: string;
  productTypeCodeValueId?: string;
  loanTypeCodeValueId?: string;
  repaymentTypeCodeValueId?: string;
  collateralTypeCodeValueId?: string;
  rateTypeCodeValueId?: string;
  note?: string;
  finPrdtCd?: string;
  finCoNo?: string;
  joinWay?: string;
  cbName?: string;
  addDate?: string;
  endDate?: string;
  updatedAt?: string;
};
