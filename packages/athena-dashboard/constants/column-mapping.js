const columns = [
	{ Header: 'Shipment Record ID', accessor: (item) => item.shipment_record_id },
	{ Header: 'Importer Lead ID', accessor: (item) => item.importer_lead_id },
	{ Header: 'Exporter Lead ID', accessor: (item) => item.exporter_lead_id },
	{ Header: 'Shipment Mode', accessor: (item) => item.shipment_mode },
	{ Header: 'Incoterm', accessor: (item) => item.incoterm },
	{ Header: 'Origin Port', accessor: (item) => item.origin_port },
	{ Header: 'Origin Country', accessor: (item) => item.origin_country },
	{ Header: 'Destination Port', accessor: (item) => item.destination_port },
	{ Header: 'Destination Country', accessor: (item) => item.destination_country },
	{ Header: 'Shipment Date', accessor: (item) => item.shipment_date },
	{ Header: 'Shipment Value', accessor: (item) => item.shipment_value },
	{ Header: 'Importer Lead Segment', accessor: (item) => item.importer_lead_segment },
	{ Header: 'Exporter Lead Segment', accessor: (item) => item.exporter_lead_segment },
	{ Header: 'HS Code', accessor: (item) => item.hscodes.map((i) => `[${i.toString()}]`).join(', ') },
];
export default columns;
