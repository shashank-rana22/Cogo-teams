import React, { ReactNode } from 'react';

export interface fieldProps {
	topKey:object,
	bottomKey:object,
	label :string,
	key:string
}
export interface fieldItemProps {
	billType:string,
	billNumber: string,
	billDocumentUrl:string,
	isProforma:boolean,
	jobNumber:string,
	serviceType:string,
	organizationName:string,
	status:string,
	createdDate:string,
	billDate:string,
	dueDate:string,
	billCurrency:string,
	grandTotal:number,
}
