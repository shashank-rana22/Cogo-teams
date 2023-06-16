import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { format, getByKey } from '@cogoport/utils';

interface SettlementProps {
	setActive?: (p: boolean)=> void,
	getHistoryChild?: Function
}

const SettlementList = ({
	setActive,
	getHistoryChild,
}: SettlementProps) => [
	{
		Header   : 'Reference Number',
		id       : 'name',
		accessor : (row) => (
			<div>
				{getByKey(row, 'documentValue') as string}
			</div>
		),

	},

	{
		Header   : 'Amount',
		accessor : (row) => (

			<div>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'documentAmount') as any,
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},
	{
		Header   : 'Utilized',
		accessor : (row) => (

			<div>
				<div>
					{formatAmount({
						amount   :	getByKey(row, 'settledAmount') as any,
						currency :	getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},
	{
		Header   : 'Balance',
		accessor : (row) => (

			<div>
				<div>
					{formatAmount({
						amount   : getByKey(row, 'balanceAmount') as any,
						currency : getByKey(row, 'currency'),
						options  : {
							style           : 'currency',
							currencyDisplay : 'code',
						},
					})}

				</div>
			</div>

		),
	},

	{
		Header   : 'Transaction Date',
		accessor : (row) => (
			<div>
				<div>{format(getByKey(row, 'transactionDate') as Date, 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},
	{
		Header   : 'Last Edited On',
		accessor : (row) => (
			<div>
				<div>{format(getByKey(row, 'lastEditedDate') as Date, 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},
	{
		Header   : 'Knocked Off Documents',
		accessor : (row) => (
			<div>
				<Button
					size="sm"
					themeType="primary"
					onClick={() => {
						setActive(true);
						getHistoryChild(row);
					}}
				>
					View More
				</Button>

			</div>
		),
		id: 'more_document',

	},

];

export default SettlementList;
