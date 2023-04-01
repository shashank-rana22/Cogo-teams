import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

export const OutstandingKamColumn = [
	{
		Header   : 'KAM Name',
		accessor : (row) => (

			<div>

				{	(getByKey(row, 'kam_owners') as string).length > 15 ? (
					<Tooltip
						placement="top"
						content={getByKey(row, 'kam_owners') as string}
					>
						<text className={styles.wrapper}>
							{`${(getByKey(row, 'kam_owners') as string).substring(
								0,
								20,
							)}...`}
						</text>
					</Tooltip>
				)

					: (
						<div className={styles.styled_name}>
							{getByKey(row, 'kam_owners') as string}
						</div>
					)}
			</div>

		),
		id: 'kam_owners',
	},
	{
		Header   : 'Amount',
		accessor : (row) => (
			<div>
				<Tooltip content={(
					<div className={styles.wrapper}>
						{getFormattedPrice(getByKey(row, 'open_invoice_amount') as number, 'INR')}
					</div>
				)}
				>
					<div className={styles.styled_name}>
						{getFormattedPrice(getByKey(row, 'open_invoice_amount') as number, 'INR',	{
							notation              : 'compact',
							compactDisplay        : 'short',
							maximumFractionDigits : 2,
							style                 : 'decimal',
						})}
					</div>

				</Tooltip>

			</div>
		),
		id: 'open_invoice_amount',
	},
	{
		Header   : 'Outstanding Amt.',
		accessor : (row) => (
			<div>

				<Tooltip content={(
					<div className={styles.wrapper}>
						{getFormattedPrice(
							getByKey(row, 'total_outstanding_amount') as number,
							'INR',
						)}
					</div>
				)}
				>
					<div className={styles.styled_name}>
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

				</Tooltip>

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
