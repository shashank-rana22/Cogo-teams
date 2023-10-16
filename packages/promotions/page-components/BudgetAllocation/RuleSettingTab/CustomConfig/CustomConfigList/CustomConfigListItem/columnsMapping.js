import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

const columnsMapping = [
	{
		key      : 'agent_name',
		label    : 'Agent',
		getValue : (data) => data?.agent_data?.name || '___',
		span     : 3.5,
	},
	{
		key      : 'updated_at',
		label    : 'Last updated on',
		getValue : (data) => formatDate({
			date       : data?.updated_at,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		span: 3.5,
	},
	{
		key      : 'status',
		label    : 'Status',
		getValue : (data) => startCase(data?.status),
		span     : 3.5,
	},
];

export default columnsMapping;
