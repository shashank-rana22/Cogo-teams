const centralisedCustomerService = {
	'/[partner_id]/centralised-customer-service': {
		navigation : 'centralised_customer_service',
		isMainNav  : true,
	},
	'/[partner_id]/centralised-customer-service/create-config': {
		navigation : 'centralised_customer_service',
		isMainNav  : false,
	},
	'/[partner_id]/centralised-customer-service/edit-capacity': {
		navigation : 'centralised_customer_service',
		isMainNav  : false,
	},
	'/[partner_id]/centralised-customer-service/create-shipment-capacity-config': {
		navigation : 'centralised_customer_service',
		isMainNav  : false,
	},
};

module.exports = centralisedCustomerService;
