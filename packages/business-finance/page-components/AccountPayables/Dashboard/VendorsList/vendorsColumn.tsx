import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

const VendorsColumn = (currency) => ([
	{
		Header   : <div>Vendor Name</div>,
		id       : 'businessName',
		accessor : (row) => {
			const { businessName } = row || {};
			return (

				<div className={styles.reference_id}>
					{businessName?.length > 30
						? (
							<Tooltip
								placement="top"
								content={businessName}
							>
								<text>

									{`${businessName.substring(
										0,
										30,
									)}...`}

								</text>
							</Tooltip>
						)
						:							businessName}
				</div>

			);
		},
	},
	{
		Header   : <div>Amount</div>,
		id       : 'openInvoiceLedgerAmount',
		accessor : (row) => {
			const { openInvoiceLedgerAmount } = row || {};
			return (
				<div>
					<Tooltip
						content={formatAmount({
							amount  : getByKey(row, 'openInvoiceLedgerAmount') as any,
							currency,
							options : {
								currencyDisplay : 'code',
								style           : 'currency',

							},
						})}
						interactive
						placement="top"
					>
						<div>
							{formatAmount({
								amount  : openInvoiceLedgerAmount,
								currency,
								options : {
									currencyDisplay : 'code',
									style           : 'currency',
									notation        : 'compact',
									compactDisplay  : 'short',
								},
							})}
						</div>
					</Tooltip>

				</div>
			);
		},
	},
	{
		Header   : <div>Invoices</div>,
		id       : 'openInvoiceCount',
		accessor : (row) => (
			<div className={styles.count}>
				{getByKey(row, 'openInvoiceCount') as string}
			</div>

		),
	},

]);
export default VendorsColumn;
