const tableDataColumns = {
	shipmentByHscode: ['shipment_record_id',
		'importer_lead_id', 'exporter_lead_id', 'shipment_mode', 'incoterm', 'origin_port',
		'origin_country', 'destination_port', 'destination_country',
		'shipment_date', 'shipment_value', 'importer_lead_segment', 'exporter_lead_segment', 'hscodes'],
	hsCodesDescription : ['hs_code', 'description'],
	topGlobalSuppliers : ['country', 'share', 'trend', 'jan',
		'feb', 'mar', 'apr', 'may', 'jun', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'],
};
export default tableDataColumns;
