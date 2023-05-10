import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function SageDetailsCard({ sageInvoiceInfo }) {
	const sageInvoiceInfoObject = sageInvoiceInfo[0] || {};

	const {
		name = '', invoice_number : InvoiceNumber = '',
		sage_status : SageStatus = '', bpr_number : BprNumber = '', entity = '',
		currency = '', exchange_rate : ExchangeRate = '',
		tax_amount : TaxAmount = '', grand_total: GrandTotal = '', ledger_total: LedgerTotal = '',
	} = sageInvoiceInfoObject;
	return (
		<div className={styles.div_flex}>
			<div>
				<div className={styles.lable}>Name</div>

				{name.length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={<div className={styles.tool_tip}>{name}</div>}
					>
						<text className={styles.cursor}>
							{`${name.substring(
								0,
								20,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div className={styles.styled_lable_value}>
							{name || '-'}
						</div>
					)}
			</div>
			<div>
				<div className={styles.lable}>Invoice Number</div>
				{InvoiceNumber.length > 10 ? (
					<Tooltip
						interactive
						placement="top"
						content={<div className={styles.tool_tip}>{InvoiceNumber}</div>}
					>
						<text className={styles.cursor}>
							{`${InvoiceNumber.substring(
								0,
								10,
							)}...`}
						</text>
					</Tooltip>
				)
					: (
						<div className={styles.styled_lable_value}>
							{InvoiceNumber || '-'}
						</div>
					)}
			</div>
			<div>
				<div className={styles.lable}>Status</div>
				<div className={styles.styled_lable_value}>{SageStatus || '-'}</div>
			</div>
			<div>
				<div className={styles.lable}>BPR Number</div>
				<div className={styles.styled_lable_value}>{BprNumber || '-'}</div>
			</div>
			<div>
				<div className={styles.lable}>Entity</div>
				<div className={styles.styled_lable_value}>{entity || '-'}</div>
			</div>
			<div>
				<div className={styles.lable}>Currency</div>
				<div className={styles.styled_lable_value}>{currency || '-'}</div>
			</div>
			<div>
				<div className={styles.lable}>Exc. Rate</div>
				<div className={styles.styled_lable_value}>{ExchangeRate || '-'}</div>
			</div>
			<div>
				<div className={styles.lable}>Tax Amount</div>
				<div className={styles.styled_lable_value}>
					{getFormattedPrice(TaxAmount || 0, currency || '') || '-'}
				</div>
			</div>
			<div>
				<div className={styles.lable}>Total Amount</div>
				<div className={styles.styled_lable_value}>
					{getFormattedPrice(GrandTotal || 0, currency || '') || '-'}
				</div>

			</div>
			<div>
				<div className={styles.lable}>Ledger Amount</div>
				<div className={styles.styled_lable_value}>
					{getFormattedPrice(LedgerTotal || 0, currency || '') || '-'}
				</div>
			</div>

		</div>

	);
}

export default SageDetailsCard;
