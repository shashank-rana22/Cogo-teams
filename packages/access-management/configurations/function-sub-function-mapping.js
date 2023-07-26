const functionSubFunctionMapping = {
	sales: [
		{ label: 'Customer Success', value: 'customer_success' },
		{ label: 'Field Sales', value: 'field_sales' },
		{ label: 'Strategic Sales', value: 'strategic_sales' },
		{ label: 'CP Sales', value: 'cp_sales' },
		{ label: 'Acquisition', value: 'acquisition' },
		{ label: 'CP Portfolio', value: 'cp_portfolio' },
		{ label: 'Customer Operations', value: 'customer_operations' },
	],
	supply: [
		{ label: 'Shipping Line', value: 'shipping_line' },
		{ label: 'Freight Forwarder', value: 'freight_forwarder' },
		{ label: 'Transportation', value: 'transportation' },
		{ label: 'CFS', value: 'cfs' },
		{ label: 'Customs', value: 'customs' },
		{ label: 'NVOCC', value: 'nvocc' },
		{ label: 'Overseas', value: 'overseas' },
		{ label: 'IATA Agents', value: 'iata_agents' },
	],
	operations: [
		{ label: 'Booking Desk', value: 'booking_desk' },
		{ label: 'Post Shipment', value: 'post_shipment' },
		{ label: 'FinOps', value: 'finops' },
		{ label: 'SME - Customer Operations', value: 'sme_customer_operations' },
		{ label: 'CP - Customer Operations', value: 'cp_customer_operations' },
		{ label: 'ES - Customer Operations', value: 'es_customer_operations' },
	],
	finance  : [],
	training : [
		{ label: 'Training General', value: 'training_general' },
		{ label: 'Tech', value: 'tech' },
		{ label: 'Product', value: 'product' },
	],
	hr: [
		{ label: 'HR Admin', value: 'hr_admin' },
		{ label: 'HRBP', value: 'hrbp' },
		{ label: 'Talent Acquisition', value: 'talent_acquisition' },
	],
	external: [
		{ label: 'Enrichment', value: 'enrichment' },
	],
};

export default functionSubFunctionMapping;
