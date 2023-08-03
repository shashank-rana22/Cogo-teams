const formatIps = (ips) => {
	const newIps = ips?.map((ip) => {
		const {
			billing_address : ba, id, is_active, services = [], is_igst,
			invoice_currency, invoicing_party_total_discounted, invoice_total_currency,
			status, source:invoice_source,
		} = ip || {};

		return {
			id,
			is_active,
			billing_address: {
				trade_party_type            : ba?.trade_party_type,
				tax_number                  : ba?.tax_number,
				organization_trade_party_id : ba?.organization_trade_party_id,
				registration_number         : ba?.registration_number,
				poc                         : ba?.poc,
				pincode                     : ba?.pincode,
				organization_id             : ba?.organization_id,
				organization_country_id     : ba?.organization_country_id,
				name                        : ba?.name,
				is_sez                      : ba?.is_sez,
				business_name               : ba?.business_name,
				address                     : ba?.address,
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
			invoice_currency: ba?.invoice_currency || invoice_currency,
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
