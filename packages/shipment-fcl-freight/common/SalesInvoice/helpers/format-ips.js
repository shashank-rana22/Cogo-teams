const formatIps = (ips) => {
	const newIps = ips?.map((ip) => {
		const ba = ip?.billing_address;

		return {
			id              : ip?.id,
			is_active       : ip?.is_active,
			billing_address : {
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
			services: (ip?.services || []).map((service) => {
				const serv = {
					service_type : service?.service_type,
					service_id   : service?.service_id,
					trade_type   : service?.trade_type,
					display_name:
						service?.service_type === 'shipment'
							? 'Convenience Fees'
							: service?.display_name,
					serviceKey : service?.serviceKey,
					is_igst    : ip?.is_igst || null,
				};
				return serv;
			}),
			invoice_currency                 : ba?.invoice_currency || ip?.invoice_currency,
			invoicing_party_total_discounted : ip?.invoicing_party_total_discounted,
			invoice_total_currency           : ip?.invoice_total_currency,
			status                           : ip?.status,
			invoice_source                   : ip?.source,
			is_igst                          : ip?.is_igst,
		};
	});

	return newIps;
};

export default formatIps;
