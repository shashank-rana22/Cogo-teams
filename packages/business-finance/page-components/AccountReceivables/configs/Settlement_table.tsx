import { Button } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
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
					{getFormattedPrice(
						getByKey(row, 'documentAmount') as number,
						getByKey(row, 'currency') as string,
					)}

				</div>
			</div>

		),
	},
	{
		Header   : 'Utilized',
		accessor : (row) => (

			<div>
				<div>
					{getFormattedPrice(
						getByKey(row, 'settledAmount') as number,
						getByKey(row, 'currency') as string,
					)}

				</div>
			</div>

		),
	},
	{
		Header   : 'Balance',
		accessor : (row) => (

			<div>
				<div>
					{getFormattedPrice(
						getByKey(row, 'balanceAmount') as number,
						getByKey(row, 'currency') as string,
					)}

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
