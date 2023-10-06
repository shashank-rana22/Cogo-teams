import getPrice from '@cogoport/forms/utils/get-formatted-price';
import { getByKey, startCase } from '@cogoport/utils';

const SettlementColumn = [
	{
		Header   : <div>Doc. No.</div>,
		id       : 'business_partner',
		accessor : (row) => (
			<div>
				<div>
					{startCase(getByKey(row, 'documentValue'))}
				</div>
			</div>
		),
	},
	{
		Header   : 'Amount',
		id       : 'amount',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'documentAmount'), getByKey(row, 'currency'))}</div>
			</div>

		),
	},

	{
		Header   : 'Exc. Rate',
		id       : 'exc_rate',
		accessor : (row) => (
			<div>
				{getByKey(row, 'exchangeRate')}
			</div>

		),
	},
	{
		Header   : 'TDS',
		id       : 'tds',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'amount'), getByKey(row, 'currency'))}</div>
			</div>

		),
	},
	{
		Header   : <div>Nostro</div>,
		id       : 'category',
		accessor : (row) => (
			<div>{getPrice(getByKey(row, 'nostroAmount'), getByKey(row, 'currency'))}</div>

		),
	},
	{
		Header   : 'Settled TDS',
		id       : 'settled_tds',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'settledTds'), getByKey(row, 'currency'))}</div>
			</div>

		),
	},
	{
		Header   : 'Balance Amount',
		id       : 'balance_amount',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'balanceAmount'), getByKey(row, 'currency'))}</div>
			</div>

		),
	},
	{
		Header   : 'Allocation',
		id       : 'allocation',
		accessor : (row) => (
			<div>
				<div>{getPrice(getByKey(row, 'allocationAmount'), getByKey(row, 'currency'))}</div>
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
						getByKey(row, 'balanceAfterAllocation'),
						getByKey(row, 'currency'),
					)}

				</div>
			</div>

		),
	},

];
export default SettlementColumn;
