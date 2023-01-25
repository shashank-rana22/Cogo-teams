import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styled from './styles.module.css';

interface itemProps {
	billType:string,
	billDocumentUrl:string,
	serviceType:string,
	billNumber:string,
	isProforma:boolean,
	jobNumber:string,
}
interface Props {
	itemData:itemProps;
	field:{
		topKey:object,
		  bottomKey:object,
		  label :string
	}
}

function FieldPair({ itemData, field }:Props) {
	const { topKey = {}, bottomKey = {} } = field;
	const {	billType = '', billNumber = '', isProforma = '', billDocumentUrl, jobNumber = '', serviceType } = itemData;

	const handleBillType = (item:object) => {
		let invoiceType;
		if (billType === 'BILL') {
			if (isProforma) {
				invoiceType = 'Proforma Invoice';
			} else {
				invoiceType = 'Purchase Invoice';
			}
		} else if (billType === 'REIMBURSEMENT') {
			invoiceType = 'reimbursement';
		} else if (billType === 'EXPENSE') {
			invoiceType = 'Expense';
		} else if (billType === 'CREDIT_NOTE') {
			invoiceType = 'Credit Notes';
		}
		return invoiceType;
	};

	return (
		<div>
			{field?.label === 'Invoice No.' && (
				<div>
					{topKey && (
						<div className={styled.billnumbers}>
							{billNumber.length > 11 ? (
								<Tooltip
									interactive
									placement="top"
									content={billNumber}
								>
									<text onClick={() => window.open(billDocumentUrl, '_blank')}>
										{`${billNumber.substring(0, 11)}...`}
									</text>
								</Tooltip>
							) : (
								<text onClick={() => window.open(billDocumentUrl, '_blank')}>
									{billNumber}
								</text>
							)}
						</div>
					)}

					{bottomKey && (
						<div className={styled.lowerKeys}>{handleBillType(itemData)}</div>
					)}
				</div>
			)}
			{field?.label === 'SID' && (
				<div>
					{topKey && (
						<text className={styled.sid}>
							{jobNumber}
						</text>
					)}
					{bottomKey && (
						<div className={styled.serviceType}>{startCase(serviceType)}</div>
					)}
				</div>
			)}

		</div>
	);
}
export default FieldPair;
