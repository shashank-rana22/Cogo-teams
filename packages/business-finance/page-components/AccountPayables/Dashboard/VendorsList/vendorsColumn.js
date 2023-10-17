import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

const vendorsColumn = (currency) => ([
	{
		Header   : <div>Vendor Name</div>,
		id       : 'organizationName',
		accessor : (row) => {
			const { organizationName } = row || {};
			return (

				<div className={styles.reference_id}>
					{organizationName?.length > 30
						? (
							<Tooltip
								placement="top"
								content={organizationName}
							>
								<text>

									{`${organizationName.substring(
										0,
										30,
									)}...`}

								</text>
							</Tooltip>
						)
						: organizationName}
				</div>

			);
		},
	},
	{
		Header   : <div>Amount</div>,
		id       : 'totalOpenInvoiceAmount',
		accessor : (row) => {
			const { totalOpenInvoiceAmount } = row || {};
			return (
				<div>
					<Tooltip
						content={formatAmount({
							amount  : getByKey(row, 'totalOpenInvoiceAmount'),
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
								amount  : totalOpenInvoiceAmount,
								currency,
								options : {
									currencyDisplay : 'code',
									style           : 'currency',
									notation        : 'compact',
									compactDisplay  : 'short',
									currencyWise    : true,
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
		id       : 'totalOpenInvoiceCount',
		accessor : (row) => (
			<div className={styles.count}>
				{getByKey(row, 'totalOpenInvoiceCount')}
			</div>

		),
	},

]);
export default vendorsColumn;
