import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const CHECK_MAX_TOOL_TIP = 20;
const CHECK_MIN_TOOL_TIP = 0;

function SageDetailsCard({ InvoiceInfo }) {
	const {
		name = '', invoice_number : InvoiceNumber = '',
		sage_status : SageStatus = '', bpr_number : BprNumber = '', job_number: JobNumber = '',
		currency = '', exchange_rate : ExchangeRate = '',
		tax_amount : TaxAmount = '', grand_total: GrandTotal = '', ledger_total: LedgerTotal = '',
		status = '',
	} = InvoiceInfo;

	const getData = [
		{
			key   : 'Name',
			value : name || '-',
		},
		{
			key   : 'Invoice Number',
			value : InvoiceNumber || '-',
		},
		{
			key   : 'Status',
			value : SageStatus || status || '-',
		},
		{
			key   : 'BPR Number',
			value : BprNumber || '-',
		},
		{
			key   : 'Job Number',
			value : JobNumber || '-',
		},
		{
			key   : 'currency',
			value : currency || '-',
		},
		{
			key   : 'Exc. Rate',
			value : ExchangeRate || '-',
		},
		{
			key   : 'Tax Amount',
			value : getFormattedPrice(TaxAmount || CHECK_MIN_TOOL_TIP, currency || '') || '-',
		},
		{
			key   : 'Total Amount',
			value : getFormattedPrice(GrandTotal || CHECK_MIN_TOOL_TIP, currency || '') || '-',
		},
		{
			key   : 'Ledger Amount',
			value : getFormattedPrice(LedgerTotal || CHECK_MIN_TOOL_TIP, currency || '') || '-',
		},
	];

	return (
		<div className={styles.div_flex}>
			{getData.map((item) => (
				<div key={item.key}>
					<div className={styles.lable}>{item.key}</div>
					{item.value.length > CHECK_MAX_TOOL_TIP ? (
						<Tooltip
							interactive
							placement="top"
							content={<div className={styles.tool_tip}>{item.value}</div>}
						>
							<text className={styles.cursor}>
								{`${item?.value?.substring(
									CHECK_MIN_TOOL_TIP,
									CHECK_MAX_TOOL_TIP,
								)}...`}
							</text>
						</Tooltip>
					)
						: (
							<div className={styles.styled_lable_value}>
								{item.value || '-'}
							</div>
						)}
				</div>
			))}
		</div>

	);
}

export default SageDetailsCard;
