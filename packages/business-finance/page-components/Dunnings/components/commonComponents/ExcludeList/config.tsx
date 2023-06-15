import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import CheckboxItem from './CheckboxItem';
import styles from './styles.module.css';

export const config = (
	{
		uncheckedRows,
		setUncheckedRows,
	},
) => [
	{
		Header   : '',
		id       : 'checkbox',
		accessor : (row?:object) => (
			<CheckboxItem
				uncheckedRows={uncheckedRows}
				setUncheckedRows={setUncheckedRows}
				row={row}

			/>
		),
		// span: 1,
	},
	{
		Header   : 'Customer Name',
		id       : 'tradePartyName',
		accessor : (row) => (
			<div style={{ marginRight: '20px' }}>
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
		// span: 3,
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
		// span: 3,
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
		// span: 3,
	},
];

export default config;
