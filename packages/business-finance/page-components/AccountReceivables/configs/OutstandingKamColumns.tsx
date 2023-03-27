import { getFormattedPrice } from '@cogoport/forms';
import { getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

export const OutstandingKamColumn = [
	{
		Header   : 'KAM Name',
		accessor : 'kam_owners',
		id       : 'kam_owners',
	},
	{
		Header   : 'Amount',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>
					{getFormattedPrice(getByKey(row, 'open_invoice_amount') as number, 'INR',	{
						notation              : 'compact',
						compactDisplay        : 'short',
						maximumFractionDigits : 2,
						style                 : 'decimal',
					})}

				</div>
			</div>
		),
		id: 'open_invoice_amount',
	},
	{
		Header   : 'Outstanding Amt.',
		accessor : (row) => (
			<div className={styles.amount}>
				<div>
					{getFormattedPrice(
						getByKey(row, 'total_outstanding_amount') as number,
						'INR',
						{
							notation              : 'compact',
							compactDisplay        : 'short',
							maximumFractionDigits : 2,
							style                 : 'decimal',
						},

					)}

				</div>
			</div>
		),
		id: 'total_outstanding_amount',
	},
];

export const OutstandingManagerColumn = [
	{
		Header   : 'Manager Name',
		accessor : 'name',
		id       : 'name',
	},
	{
		Header   : 'Amount',
		accessor : 'amount',
		id       : 'amount',
	},
	{
		Header   : 'Team Member',
		id       : 'teamMember',
		accessor : 'teamMember',

	},
];
