import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatDate from '@cogoport/globalization/utils/formatDate';

const geo = getGeoConstants();

const getDate = (date) => (date ? formatDate({
	date,
	dateFormat : geo.formats.date.default,
	formatType : 'date',
}) : '-');

const tableColumns = [
	{
		Header   : 'Train Number',
		accessor : (item) => item?.train_number || '-',
		id       : 'train_number',
	},
	{
		Header   : 'Container Number',
		accessor : (item) => item?.container_number || '-',
		id       : 'container_number',
	},
	{
		Header   : 'Current Station',
		accessor : (item) => item?.current_station || '-',
		id       : 'current_station',
	},
	{
		Header   : 'From Station',
		accessor : (item) => item?.from_station || '-',
		id       : 'from_station',
	},
	{
		Header   : 'To Station',
		accessor : (item) => item?.to_station || '-',
		id       : 'to_station',
	},
	{
		Header   : 'Allotment Date',
		accessor : (item) => getDate(item?.allotment_date),
		id       : 'allotment_date',
	},
	{
		Header   : 'Dispatch Date',
		accessor : (item) => getDate(item?.dispatch_date),
		id       : 'dispatch_date',
	},
	{
		Headers  : 'Sealing Date',
		accessor : (item) => getDate(item?.sealing_date),
		id       : 'sailing_date',
	},
	{
		Header   : 'Actual Arrival',
		accessor : (item) => getDate(item?.actual_arrival),
		id       : 'actual_arrival',
	},
	{
		Header   : 'Expected Arrival',
		accessor : (item) => getDate(item?.expected_arrival),
		id       : 'expected_arrival',
	},
];

export default tableColumns;
