import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';
import getFormattedPrice from '../../../../../commons/utils/getFormattedPrice';

import styled from './styles.module.css';

interface ItemProps {
	createdDate: Date;
	billDate: Date;
	dueDate: Date;
	billCurrency?: string;
	subTotal?: number;
	grandTotal?: number;
}
interface Props {
	item: ItemProps;
	field: {
		key: string;
		topKey: object;
		bottomKey: object;
		label: string;
	};
}

function FormatedDate({ item, field }: Props) {
	const { createdDate, billDate, dueDate, subTotal, billCurrency, grandTotal } = item || {};
	const getCreatedDate = format(createdDate, 'dd MMM, yyyy', {}, false);
	const getCreatedDateTime = format(createdDate, 'h:mm:aa', {}, false);
	const getBillDate = format(billDate, 'dd MMM, yyyy', {}, false);
	const getDueDate = format(dueDate, 'dd MMM, yyyy', {}, false);

	const content = (
		<>
			<div className={styled.pre_tax}>
				Pre Tax :
				<text className={styled.pre_tax_amount}>
					{getFormattedPrice(subTotal, billCurrency!)}
				</text>
			</div>
			<div className={styled.post_tax}>
				Post Tax:
				<text className={styled.post_tax_amount}>
					{getFormattedPrice(grandTotal, billCurrency!)}
				</text>
			</div>
		</>
	);

	const formatAmount = getFormattedPrice(grandTotal, billCurrency) || '-';
	return (
		<div>

			{field?.key === 'billDate' && <div>{getBillDate}</div>}
			{field?.key === 'dueDate' && <div>{getDueDate}</div>}
			{field?.key === 'grandTotal' && (
				<div className={styled.invoice_amount}>
					<div className={styled.show_amount}>{showOverflowingNumber(formatAmount, 16)}</div>

					<Tooltip placement="top" content={content} interactive>
						<div className={styled.ic_min_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
			)}
			{field?.label === 'Last Modified Date' && (
				<div>
					<text className={styled.sid}>{getCreatedDate}</text>
					<div className={styled.service_type}>{getCreatedDateTime}</div>
				</div>
			)}
		</div>
	);
}

export default FormatedDate;
