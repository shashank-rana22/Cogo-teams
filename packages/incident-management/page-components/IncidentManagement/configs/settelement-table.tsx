import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { getByKey, startCase } from '@cogoport/utils';

// import styles from './styles.module.css';

const SettlementColumn = [
	// {
	// 	Header   : <div>Org. Name</div>,
	// 	id       : 'org_name',
	// 	accessor : (row) => (
	// 		<div>
	// 			<div className={styles.referenceId}>
	// 				{getByKey(row, 'jvNum') as string}
	// 			</div>
	// 		</div>
	// 	),
	// },
	// {
	// 	Header   : <div>Date</div>,
	// 	id       : 'date',
	// 	accessor : (row) => (
	// 		<div>
	// 			<div>
	// 				{getByKey(row, 'entityCode') as string}
	// 			</div>
	// 		</div>
	// 	),
	// },
	{
		Header   : <div>Doc. No.</div>,
		id       : 'business_partner',
		accessor : (row) => (
			<div>
				<div>
					{startCase(getByKey(row, 'documentValue') as string)}
				</div>
			</div>
		),
	},
	{
		Header   : 'Amount',
		id       : 'amount',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'documentAmount') as number, getByKey(row, 'currency') as string)}</div>
			</div>

		),
	},

	{
		Header   : 'Exc. Rate',
		id       : 'exc_rate',
		accessor : (row) => (
			<div>
				{getByKey(row, 'exchangeRate') as string}
			</div>

		),
	},
	{
		Header   : 'TDS',
		id       : 'tds',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'amount') as number, getByKey(row, 'currency') as string)}</div>
			</div>

		),
	},
	{
		Header   : <div>Nostro</div>,
		id       : 'category',
		accessor : (row) => (
			<div>{getPrice(getByKey(row, 'nostroAmount') as number, getByKey(row, 'currency') as string)}</div>

		),
	},
	{
		Header   : 'Settled TDS',
		id       : 'settled_tds',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'settledTds') as number, getByKey(row, 'currency') as string)}</div>
			</div>

		),
	},
	{
		Header   : 'Balance Amount',
		id       : 'balance_amount',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'balanceAmount') as number, getByKey(row, 'currency') as string)}</div>
			</div>

		),
	},
	{
		Header   : 'Allocation',
		id       : 'allocation',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'allocationAmount') as number, getByKey(row, 'currency') as string)}</div>
			</div>

		),
	},
	{
		Header   : 'Balance after Allocation',
		id       : 'balance_after_allocation',
		accessor : (row) => (
			<div>
				<div>
					{getPrice(
						getByKey(row, 'balanceAfterAllocation') as number,
						getByKey(row, 'currency') as string,
					)}

				</div>
			</div>

		),
	},

];
export default SettlementColumn;
