import { Pill } from '@cogoport/components';

export const tabColumns = [
	{ Header: '#', accessor: (item) => (item?.id || '-') },
	{ Header: 'File Name', accessor: (item) => (item?.formatted_file_name || '-') },
	{ Header: 'Unique Leads', accessor: (item) => (item?.unique_leads_created_count || '-') },
	{ Header: 'Update Leads', accessor: (item) => (item?.leads_updated_count || '-') },
	{ Header: 'Shipment Records', accessor: (item) => (item?.shipment_records_created_count || '-') },
	{ Header: 'Created At', accessor: (item) => (item?.created_at || '-') },
	{ Header: 'Updated At', accessor: (item) => ((item?.updated_at) || (item?.created_at)) },
	{ Header: 'Status', accessor: (item) => (<Pill>{item?.status}</Pill> || '-') },

];
