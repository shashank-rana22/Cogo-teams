import React from 'react';
import {Tooltip} from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import {Tags} from '@cogoport/components';
import styled from './styles.module.css'


const FieldPair = ({ item = {}, field = {} }) => {
	const { topKey = '', lowerKey = '' } = field;
	const {	billType = '',billNumber='',isProforma='',billDocumentUrl,jobNumber='',serviceType} = item || {};
	
    const handleBillType = (item:any) => {
        let invoiceType;
		if (billType=== "BILL") {
			if (isProforma) {
				invoiceType = 'Proforma Invoice';
			} else {
				invoiceType = 'Purchase Invoice';
			}
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

				{lowerKey && (
				<div className={styled.lowerKeys}>{handleBillType(item)}</div>
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
				{lowerKey && (
				<div className={styled.serviceType}>{startCase(serviceType)}</div>
				)}
			</div>
		)}
		
		</div>
	);
};
export default FieldPair;
