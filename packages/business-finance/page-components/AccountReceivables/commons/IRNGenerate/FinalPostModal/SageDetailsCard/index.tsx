import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

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
			value : getFormattedPrice(TaxAmount || 0, currency || '') || '-',
		},
		{
			key   : 'Total Amount',
			value : getFormattedPrice(GrandTotal || 0, currency || '') || '-',
		},
		{
			key   : 'Ledger Amount',
			value : getFormattedPrice(LedgerTotal || 0, currency || '') || '-',
		},
	];

	return (
		<div className={styles.div_flex}>
			{getData.map((item) => (
				<div>
					<div className={styles.lable}>{item.key}</div>
					{item.value.length > 20 ? (
						<Tooltip
							interactive
							placement="top"
							content={<div className={styles.tool_tip}>{item.value}</div>}
						>
							<text className={styles.cursor}>
								{`${item.value.substring(
									0,
									20,
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
