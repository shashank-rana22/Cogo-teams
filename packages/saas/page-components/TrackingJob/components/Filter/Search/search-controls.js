import { IcMAppSearch } from '@cogoport/icons-react';

const control = ({ setSearchString = () => {} }) => (
	[
		{
			name        : 'airway_bill_no',
			type        : 'search',
			placeholder : 'Search By Airway Bill No.',
			span        : 12,
			size        : 'sm',
			onChange    : setSearchString,
			prefix      : <IcMAppSearch />,
		},
		{
			name        : 'container_bill_no',
			type        : 'search',
			size        : 'sm',
			placeholder : 'Search By Container/Bill No.',
			onChange    : setSearchString,
			span        : 12,
			prefix      : <IcMAppSearch />,

		},
		{
			name        : 'truck_no',
			type        : 'search',
			size        : 'sm',
			placeholder : 'Search By Truck No.',
			onChange    : setSearchString,
			span        : 12,
			prefix      : <IcMAppSearch />,

		},
		{
			name        : 'serial_id',
			type        : 'search',
			size        : 'sm',
			placeholder : 'Search By Serial Id',
			span        : 12,
			prefix      : <IcMAppSearch />,

		},
	]);

export default control;
