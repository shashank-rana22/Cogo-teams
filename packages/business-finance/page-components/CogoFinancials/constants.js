import { Button, Popover } from '@cogoport/components';

import CustomDateFilter from './Common/CustomDateFilter';

export const MAPPING_CARDS_DATA = [
	{
		label : 'Estimated Revenue',
		name  : 'estimatedRevenue',
	},
	{
		label : 'Estimated Cost',
		name  : 'estimatedCost',
	},
];

export const LABEL_MAPPING = {
	Financially   : 'actual',
	Operationally : 'operational',
};

export const INFO_CONTENT = {
	ongoingShipments    : 'Shipments confirmed by suppliers',
	operationallyClosed : 'Shipments with Operational journey completed',
	financiallyClosed   : 'Shipments with Financial journey completed',
	closedShipmentsBar  : 'Profit earned against revenue',
};

export const getTimeRangeOptions = ({ customDate, setCustomDate }) => [
	{ label: '1D', value: '1D' },
	{ label: '1W', value: '1W' },
	{ label: '1M', value: '1M' },
	{ label: '6M', value: '6M' },
	{ label: '1Y', value: '1Y' },
	{
		label: (
			<Popover
				placement="bottom"
				render={(
					<CustomDateFilter
						customDate={customDate}
						setCustomDate={setCustomDate}
					/>
				)}
			>
				<Button
					size="xs"
					style={{ background: 'none', border: 'none', color: 'black' }}
				>
					+
				</Button>

			</Popover>
		),
		value: 'custom',
	},
];
