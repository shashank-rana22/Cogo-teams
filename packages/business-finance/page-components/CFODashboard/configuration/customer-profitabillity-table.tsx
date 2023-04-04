import showOverflowingNumber from '../../commons/showOverflowingNumber';
import getFormattedPrice from '../../commons/utils/getFormattedPrice';

import styles from './styles.module.css';

const customerProfitabillityColumn = [

	{
		Header   : 'Name',
		id       : 'businessName',
		accessor : (row) => (

			<div
				style={{
					fontWeight : '400',
					fontSize   : '12px',
					marginLeft : '10px',
				}}
				className={styles.sentence_case}
			>
				{showOverflowingNumber(row?.businessName, 12)}
			</div>

		),
	},
	{
		Header   : 'Entity',
		id       : 'entity',
		accessor : 'entity',

	},
	{
		Header   : 'SID Count',
		id       : 'shipmentCount',
		accessor : (row) => (
			<div style={{ color: '#F68B21', textDecorationLine: 'underline' }}>
				{row?.shipmentCount}
			</div>
		),
	},
	{
		Header   : 'Booked Income',
		id       : 'income',
		accessor : (row) => (
			<div>
				{getFormattedPrice(
					row?.bookedIncome,
					'INR',
				)}
			</div>
		),

	},
	{
		Header   : 'Booked Expense',
		id       : 'expense',
		accessor : (row) => (
			<div>
				{getFormattedPrice(
					row?.bookedExpense,
					'INR',
				)}
			</div>
		),

	},
	{
		Header   : 'Profitability',
		id       : 'profitability',
		accessor : (row) => (
			<div>
				{ row?.profitability.toFixed(2) }
				<text>%</text>
			</div>
		),

	},

];

export default customerProfitabillityColumn;
