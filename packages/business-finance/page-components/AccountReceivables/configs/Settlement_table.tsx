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
				{getByKey(row, 'documentValue')}
			</div>
		),

	},

	{
		Header   : 'Amount',
		accessor : (row) => (

			<div>
				<div>
					{getFormattedPrice(
						getByKey(row, 'documentAmount'),
						getByKey(row, 'currency'),
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
						getByKey(row, 'settledAmount'),
						getByKey(row, 'currency'),
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
						getByKey(row, 'balanceAmount'),
						getByKey(row, 'currency'),
					)}

				</div>
			</div>

		),
	},

	{
		Header   : 'Transaction Date',
		accessor : (row) => (
			<div>
				<div>{format(getByKey(row, 'transactionDate'), 'dd MMM yy', {}, false)}</div>
			</div>
		),
	},
	{
		Header   : 'Last Edited On',
		accessor : (row) => (
			<div>
				<div>{format(getByKey(row, 'lastEditedDate'), 'dd MMM yy', {}, false)}</div>
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
