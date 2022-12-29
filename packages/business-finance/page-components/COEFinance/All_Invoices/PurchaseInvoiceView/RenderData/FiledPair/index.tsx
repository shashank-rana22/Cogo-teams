import React from 'react';
import {Tooltip} from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import styled from './styles.module.css'
import {FieldType,GenericObject,ListDataProps} from '../../../../../commons/Interfaces/index'

interface props{
	itemData:GenericObject
	  field: {
		  topKey:object,
		  bottomKey:object,
		  label :string
	  },	
}

const FieldPair = ({ itemData , field}:props) => {

	
	const { topKey = {}, bottomKey = {} } = field;
	const {	billType = '',billNumber='',isProforma='',billDocumentUrl,jobNumber='',serviceType} = itemData;

	
	
    const handleBillType = (item:object) => {
        let invoiceType;		
		if (billType=== "BILL") {
			if (isProforma) {
				invoiceType = 'Proforma Invoice';
			} else {
				invoiceType = 'Purchase Invoice';
			}
		}
		else if(billType=== "REIMBURSEMENT"){
			invoiceType='Reimbursement'
		}
		else if(billType=== "EXPENSE"){
			invoiceType="Expense"
		}
		else if(billType=== "CREDIT NOTE"){
			invoiceType="Credit Note"
		}
		return invoiceType;
	};

	return (
		<div >
			{field?.label==='Invoice No.' &&(
				<div>
					{topKey && (
						<div>
							{billNumber.length > 11 ? (
						<Tooltip
							interactive
							theme="light"
							placement="top"
							content={billNumber}
							
						>
							<text  onClick={() => window.open(billDocumentUrl, '_blank')}>
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
		{field?.label==='SID' &&(
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
};
export default FieldPair;
