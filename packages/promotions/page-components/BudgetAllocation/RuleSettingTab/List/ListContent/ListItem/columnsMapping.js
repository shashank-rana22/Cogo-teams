import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

const DEFAULT_CUSTOM_ORG = 0;

const columnsMapping = [
	{
		key      : 'serial_id',
		label    : 'Serial Id',
		getValue : (data) => data?.serial_id || '___',
		span     : 2,
	},
	{
		key      : 'updated_at',
		label    : 'Last updated on',
		getValue : (data) => formatDate({
			date       : data?.updated_at,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		}),
		span: 2,
	},
	{
		key      : 'last_updated_by',
		label    : 'Last updated by',
		getValue : (data) => data?.updated_by_user_name || '___',
		span     : 2,
	},
	{
		key      : 'custom_org_config_count',
		label    : 'Custom configuration Organizations',
		getValue : (data) => data?.agent_rules?.length || DEFAULT_CUSTOM_ORG,
		span     : 2,
	},
	{
		key      : 'status',
		label    : 'Status',
		getValue : (data) => startCase(data?.status) || '___',
		span     : 2,
	},
];

export default columnsMapping;
