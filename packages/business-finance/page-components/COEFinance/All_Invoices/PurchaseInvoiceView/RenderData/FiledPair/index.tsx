import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { handleBillType } from '../../../../utils/getHandleBillType';

import styled from './styles.module.css';

interface ItemProps {
	billType:string,
	billDocumentUrl:string,
	serviceType:string,
	billNumber:string,
	isProforma:boolean,
	jobNumber:string,
}
interface Props {
	itemData:ItemProps;
	field:{
		topKey:object,
		bottomKey:object,
		label :string
	}
}

function FieldPair({ itemData, field }:Props) {
	const {	billType = '', billNumber = '', isProforma, billDocumentUrl, jobNumber = '', serviceType } = itemData;

	return (
		<div>
			{field?.label === 'Invoice No.' && (
				<div>
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

					<div className={styled.lower_keys}>{handleBillType(billType, isProforma)}</div>
				</div>
			)}
			{field?.label === 'SID' && (
				<div>
					<text className={styled.sid}>
						{jobNumber}
					</text>

					<div className={styled.service_type}>{startCase(serviceType)}</div>
				</div>
			)}
		</div>
	);
}
export default FieldPair;
