const STATUS_ITEMS = {
	approved: {
		title      : 'Approved by both Customer and Supplier',
		status     : 'approved',
		statusName : 'Approved',
	},
	price_pending: {
		title      : 'Buy Price to be added by Tech Ops',
		status     : 'price_pending',
		statusName : 'Price Pending',
	},
	price_recieved: {
		title      : 'Buy Price recieved by Tech Ops, KAM to add sell price',
		status     : 'price_recieved',
		statusName : 'Price Recieved',
	},
	customer_confirmation_pending: {
		title      : 'Sell Price sent to customer, customer to confirm.',
		status     : 'customer_confirmation_pending',
		statusName : 'Customer Confirmation Pending',
	},
	charges_incurred: {
		title:
			'Incidental Charge added by SO, KAM to decide weather to bill to customer or not.',
		status     : 'charges_incurred',
		statusName : 'Charges Incurred',
	},
	cancelled_by_supplier: {
		title      : 'Service cancelled by Supplier',
		status     : 'cancelled_by_supplier',
		statusName : 'Cancelled by Supplier',
	},
	requested_for_service_provider: {
		title      : 'Amendment requested from supplier side',
		status     : 'requested_for_service_provider',
		statusName : 'Rate Negotiation',
	},
	cancelled_by_customer: {
		title      : 'Service cancelled by Customer',
		status     : 'cancelled_by_customer',
		statusName : 'Cancelled by Customer',
	},
	disputed: {
		title:
			'Incidental Charge billed to customer, and he/she doesn’t accept the charge.',
		status     : 'disputed',
		statusName : 'Disputed',
	},
	amendment_requested_by_importer_exporter: {
		title      : 'Some changes have been requested by importer exporter',
		status     : 'amendment_requested_by_importer_exporter',
		statusName : 'Amendment from customer',
	},
};

export default STATUS_ITEMS;
