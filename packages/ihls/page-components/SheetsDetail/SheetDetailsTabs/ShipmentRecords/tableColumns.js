import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

export const tabColumns = [
	{ Header: '#', accessor: (item) => (item?.shipment_number || '-') },
	{ Header: 'Shipment Mode', accessor: (item) => (item?.shipment_mode || '-') },
	{ Header: 'Importer Lead ID', accessor: (item) => (item?.importer_lead_id || '-') },
	{ Header: 'Exporter Lead ID', accessor: (item) => (item?.exporter_lead_id || '-') },
	{ Header: 'Origin Port', accessor: (item) => (item?.origin_port || '-') },
	{ Header: 'Origin Country', accessor: (item) => (item?.origin_country || '-') },
	{ Header: 'Destination Port', accessor: (item) => (item?.destination_port || '-') },
	{ Header: 'Destination Country', accessor: (item) => (item?.destination_country || '-') },
	{ Header: 'Incoterm', accessor: (item) => (item?.incoterm || '-') },
	{ Header: 'Shipment Value INR', accessor: (item) => (item?.shipment_value_inr || '-') },
	{ Header: 'Total Gross Weigh', accessor: (item) => (item?.total_gross_weight || '-') },
	{ Header: 'Gross Weight Unit', accessor: (item) => (item?.gross_weight_unit || '-') },
	{
		Header   : 'Shipment Date',
		accessor : (item) => (formatDate({
			date       : (item?.shipment_date),
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			formatType : 'date',
		})) || '-',
	},
	{ Header: 'Freight Value INR', accessor: (item) => (item?.total_freight_value || '-') },
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
];
