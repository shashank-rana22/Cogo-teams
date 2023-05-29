import { Tooltip, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import GetSortingData from '../Logistics/Profitabillity/profitabilitySorting';

import styles from './styles.module.css';

const customerProfitabillityColumn = (sort, setSort) => [

	{
		Header   : 'Name',
		id       : 'businessName',
		accessor : (row) => (

			<div
				className={cl`${styles.sentence_case} ${styles.name_text_style}`}
			>
				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							{row?.businessName}
						</div>
					)}
					interactive
				>
					<div>
						{(row?.businessName as string).substring(0, 12)}
						...
					</div>
				</Tooltip>
			</div>

		),
	},
	{
		Header   : 'Entity',
		id       : 'entity',
		accessor : (row) => (
			<div className={styles.text_weight}>
				{row?.entity}
			</div>
		),

	},
	{
		Header   : 'SID Count',
		id       : 'shipmentCount',
		accessor : (row) => (
			<div className={styles.text_weight}>
				{row?.shipmentCount}
			</div>
		),
	},
	{
		Header   : 'Booked Income',
		id       : 'income',
		accessor : (row) => (
			<div className={styles.text_weight}>
				{formatAmount({

					amount   :	row?.bookedIncome,
					currency :	GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})}
			</div>
		),

	},
	{
		Header   : 'Booked Expense',
		id       : 'expense',
		accessor : (row) => (
			<div className={styles.text_weight}>
				{formatAmount({
					amount   :	row?.bookedExpense,
					currency :	GLOBAL_CONSTANTS.currency_code.INR,
					options  : {
						style           : 'currency',
						currencyDisplay : 'code',
					},
				})}
			</div>
		),

	},
	{
		Header   : <GetSortingData sort={sort} setSort={setSort} />,
		id       : 'profitability',
		accessor : (row) => (
			<div className={styles.text_weight}>
				{ row?.profitability.toFixed(2) }
				<text>%</text>
			</div>
		),

	},

];

export default customerProfitabillityColumn;
