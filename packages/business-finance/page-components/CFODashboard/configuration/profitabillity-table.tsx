import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../commons/showOverflowingNumber';
import getFormattedPrice from '../../commons/utils/getFormattedPrice';

const profitabillityColumn = [
	{
		Header   : 'SID',
		id       : 'jobNumber',
		accessor : (row) => (
			<div style={{ color: '#F68B21', textDecorationLine: 'underline' }}>
				{row?.jobNumber}
			</div>
		),
	},
	{
		Header   : 'Name',
		id       : 'businessName',
		accessor : (row) => (
			<div>
				<div>
					<div style={{
						fontWeight : '400',
						fontSize   : '12px',
					}}
					>
						{showOverflowingNumber(row?.businessName, 12)}
					</div>
				</div>
			</div>
		),
	},
	{
		Header   : 'Entity',
		id       : 'entity',
		accessor : 'entity',

	},
	{
		Header   : 'Booked Income',
		id       : 'income',
		accessor : (row) => (
			<div>
				{getFormattedPrice(
					row?.income,
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
					row?.expense,
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
	{
		Header   : 'Shipment Status',
		id       : 'jobStatus',
		accessor : (row) => (
			<div>
				<Pill
					style={{ borderRadius: '6px' }}
					size="md"
					color="#CFEAED"
				>
					{startCase(row?.jobStatus)}
				</Pill>

			</div>
		),
	},
	{
		Header   : 'Milestone',
		id       : 'shipmentMilestone',
		accessor : (row) => (
			<div>
				<Pill
					style={{ borderRadius: '6px' }}
					size="md"
					color="#CFEAED"
				>
					{startCase(row?.shipmentMilestone)}
				</Pill>

			</div>

		),
	},
];

export default profitabillityColumn;
