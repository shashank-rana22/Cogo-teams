const formatIps = (ips) => {
	const newIps = ips?.map((ip) => {
		const {
			billing_address : ba, id, is_active, services = [], is_igst,
			invoice_currency, invoice_total_discounted, invoicing_party_total_discounted, invoice_total_currency,
			status, source:invoice_source,
		} = ip || {};

		const {
			trade_party_type,
			tax_number,
			organization_trade_party_id,
			registration_number,
			poc,
			pincode,
			organization_id,
			organization_country_id,
			name,
			is_sez,
			business_name,
			address,
		} = ba || {};

		return {
			id,
			is_active,
			billing_address: {
				trade_party_type,
				tax_number,
				organization_trade_party_id,
				registration_number,
				poc,
				pincode,
				organization_id,
				organization_country_id,
				name,
				is_sez,
				business_name,
				address,
			},
			services: (services || []).map((service) => ({
				service_type : service?.service_type,
				service_id   : service?.service_id,
				trade_type   : service?.trade_type,
				display_name : service?.service_type === 'shipment'
					? 'Convenience Fees'
					: service?.display_name,
				serviceKey : service?.serviceKey,
				is_igst    : is_igst || null,
			})),
			invoice_currency,
			invoice_total_discounted,
			invoicing_party_total_discounted,
			invoice_total_currency,
			status,
			invoice_source,
			is_igst,
		};
	});

	return newIps;
};

export default formatIps;
