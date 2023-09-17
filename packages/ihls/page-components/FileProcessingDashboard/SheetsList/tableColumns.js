import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import StatusTagMapping from '../../../commons/StatusTagMapping';

export const tabColumns = [
	{ Header: '#', accessor: (item) => (item?.id || '-') },
	{ Header: 'File Name', accessor: (item) => (item?.formatted_file_name || '-') },
	{ Header: 'Unique Leads', accessor: (item) => (item?.unique_leads_created_count || '-') },
	{ Header: 'Update Leads', accessor: (item) => (item?.leads_updated_count || '-') },
	{ Header: 'Shipment Records', accessor: (item) => (item?.shipment_records_created_count || '-') },
	{
		Header   : 'Created At',
		accessor : (item) => (formatDate({
			date       : (item?.created_at),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})) || '-',
	},
	{
		Header   : 'Updated At',
		accessor : (item) => (formatDate({
			date       : (item?.updated_at) || (item?.created_at),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})) || '-',
	},
	{
		Header   : 'Status',
		accessor : (item) => (StatusTagMapping?.[item?.status?.toLowerCase()] || '-'),
	},

];
