import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const manageExceptionColumn = () => [
	{
		Header   : 'Customer Name',
		id       : 'tradePartyName',
		accessor : (row) => (
			<div>
				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							{row?.tradePartyName}
						</div>
					)}
					interactive
				>
					<div className={styles.customer_name}>
						{(row?.tradePartyName as string).substring(0, 12)}
						...
					</div>
				</Tooltip>
			</div>
		),
	},
	{
		Header   : 'Total Outstanding',
		id       : 'totalOutstanding',
		accessor : (row) => (
			<div className={styles.text}>
				{formatAmount({
					amount   : row?.totalOutstanding,
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
		Header   : 'On Account',
		id       : 'totalOnAccount',
		accessor : (row) => (
			<div className={styles.text}>
				{formatAmount({
					amount   : row?.totalOnAccount,
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

export default manageExceptionColumn;
