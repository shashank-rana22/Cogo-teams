import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const masterExceptionColumn = () => [
	{
		Header   : 'Customer Name',
		id       : 'name',
		accessor : (row) => (
			<div>
				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							{row?.name}
						</div>
					)}
					interactive
				>
					<div className={styles.customer_name}>
						{(row?.name as string).substring(0, 12)}
						...
					</div>
				</Tooltip>
			</div>
		),
	},
	{
		Header   : 'PAN',
		id       : 'registrationNumber',
		accessor : (row) => (
			<div className={styles.text}>
				{row?.registrationNumber}
			</div>
		),
	},
	{
		Header   : 'Category',
		id       : 'orgSegment',
		accessor : (row) => (
			<div className={styles.text}>
				{row?.orgSegment}
			</div>
		),
	},
	{
		Header   : 'Credit Days',
		id       : 'creditDays',
		accessor : (row) => (
			<div className={styles.text}>
				{row?.creditDays}
			</div>
		),
	},
	{
		Header   : 'Credit Amount',
		id       : 'creditAmount',
		accessor : (row) => (
			<div className={styles.text}>
				{formatAmount({
					amount   : row?.creditAmount,
					currency : 'INR',
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						minimumFractionDigits : 2,
					},
				})}
			</div>
		),
	},
	{
		Header   : 'Total Due',
		id       : 'totalDueAmount',
		accessor : (row) => (
			<div className={styles.text}>
				{formatAmount({
					amount   : row?.totalDueAmount,
					currency : 'INR',
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						minimumFractionDigits : 2,
					},
				})}
			</div>
		),

	},
];

export default masterExceptionColumn;
