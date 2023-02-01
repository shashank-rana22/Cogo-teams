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

// item?.createdDate,
// "dd/MMM/yyyy  hh:mm a",
// null,
// false

function FormatedDate({ item, field }: Props) {
	const { topKey = {}, bottomKey = {} } = field;
	const getCreatedDate = format(item?.createdDate, 'dd/MMM/yyyy', {}, false);
	const getCreatedDateTime = format(item?.createdDate, 'h:mm:aa', {}, false);
	const getBillDate = format(item?.billDate, 'dd/MMM/yyyy', {}, false);
	const getDueDate = format(item?.dueDate, 'dd/MMM/yyyy', {}, false);

	const content = (
		<>
			<div className={styled.pre_tax}>
				Pre Tax :
				<text className={styled.pre_tax_amount}>
					{getFormattedPrice(item.subTotal!, item.billCurrency!)}
				</text>
			</div>
			<div className={styled.post_tax}>
				Post Tax:
				<text className={styled.post_tax_amount}>
					{getFormattedPrice(item.grandTotal!, item.billCurrency!)}
				</text>
			</div>
		</>
	);
	const formatAmount = getFormattedPrice(item.grandTotal!, item.billCurrency!) || '-';
	return (
		<div>
			{/* {field?.key === "createdDate" && <div>{getCreatedDate}</div>} */}
			{field?.key === 'billDate' && <div>{getBillDate}</div>}
			{field?.key === 'dueDate' && <div>{getDueDate}</div>}
			{field?.key === 'grandTotal' && (
				<div className={styled.invoice_amount}>
					<text>{showOverflowingNumber(formatAmount, 8)}</text>

					<Tooltip placement="top" content={content}>
						<div className={styled.ic_min_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
			)}

			{field?.label === 'Last Modified Date' && (
				<div>
					{topKey && <text className={styled.sid}>{getCreatedDate}</text>}
					{bottomKey && (
						<div className={styled.service_type}>{getCreatedDateTime}</div>
					)}
				</div>
			)}
		</div>
	);
}

export default FormatedDate;
