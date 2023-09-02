import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
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

const MAX_LEN_FOR_INVOICE_TEXT = 11;
const MAX_LEN_FOR_SID_TEXT = 10;
const BILLNUMBER_LENGTH = 0;
function FieldPair({
	itemData = {
		billType        : '',
		billDocumentUrl : '',
		serviceType     : '',
		billNumber      : '',
		isProforma      : false,
		jobNumber       : '',
	}, field = {
		topKey    : {},
		bottomKey : {},
		label     : '',
	},
}:Props) {
	const {	billType = '', billNumber = '', isProforma, billDocumentUrl, jobNumber = '', serviceType } = itemData;

	return (
		<div>
			{field?.label === 'Invoice No.' && (
				<div>
					<div className={styled.billnumbers}>
						{billNumber.length > MAX_LEN_FOR_INVOICE_TEXT ? (
							<Tooltip
								interactive
								placement="top"
								content={billNumber}
							>
								<text onClick={() => window.open(billDocumentUrl, '_blank')}>
									{`${billNumber.substring(BILLNUMBER_LENGTH, MAX_LEN_FOR_INVOICE_TEXT)}...`}
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
						{showOverflowingNumber(jobNumber, MAX_LEN_FOR_SID_TEXT)}
					</text>

					<div className={styled.service_type}>{startCase(serviceType)}</div>
				</div>
			)}
		</div>
	);
}
export default FieldPair;
