import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMInfo } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import React from 'react';

import showOverflowingNumber from '../../../../../commons/showOverflowingNumber';

import styled from './styles.module.css';

function FormatedDate({ item, field }) {
	const { createdDate, billDate, dueDate, subTotal, billCurrency, grandTotal, updatedDate } = item || {};
	const getCreatedDate = format(createdDate, 'dd MMM, yyyy', {}, false);
	const getCreatedDateTime = format(createdDate, 'h:mm:aa', {}, false);
	const getBillDate = format(billDate, 'dd MMM, yyyy', {}, false);
	const getDueDate = format(dueDate, 'dd MMM, yyyy', {}, false);
	const getUpdateDate = format(updatedDate, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'], {}, false);
	const getUpdatedDateTime = format(updatedDate, GLOBAL_CONSTANTS.formats.time['hh:mm aaa'], {}, false);

	const content = (
		<>
			<div className={styled.pre_tax}>
				Pre Tax :
				<text className={styled.pre_tax_amount}>
					{formatAmount({
						amount   :	subTotal,
						currency : billCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}
				</text>
			</div>
			<div className={styled.post_tax}>
				Post Tax:
				<text className={styled.post_tax_amount}>
					{formatAmount({
						amount   : grandTotal,
						currency : billCurrency,
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}
				</text>
			</div>
		</>
	);

	const formattedAmount = formatAmount({
		amount   :	grandTotal,
		currency :	billCurrency,
		options  : {
			style           : 'currency',
			currencyDisplay : 'code',
		},
	}) || '-';
	return (
		<div>

			{field?.key === 'billDate' && <div>{getBillDate}</div>}
			{field?.key === 'dueDate' && <div>{getDueDate}</div>}
			{field?.key === 'grandTotal' && (
				<div className={styled.invoice_amount}>
					<div className={styled.show_amount}>{showOverflowingNumber(formattedAmount, 16)}</div>

					<Tooltip placement="top" content={content} interactive>
						<div className={styled.ic_min_icon}>
							<IcMInfo width="16px" height="16px" />
						</div>
					</Tooltip>
				</div>
			)}
			{(field?.label === 'Last Modified Date')
			&& (
				<div>
					<text className={styled.sid}>{getCreatedDate}</text>
					<div className={styled.service_type}>{getCreatedDateTime}</div>
				</div>
			)}
			{(field?.key === 'createdDate' && field?.label !== 'Last Modified Date')
			&& (
				<div>
					<text className={styled.sid}>{getUpdateDate}</text>
					<div className={styled.service_type}>{getUpdatedDateTime}</div>
				</div>
			)}
		</div>
	);
}

export default FormatedDate;
