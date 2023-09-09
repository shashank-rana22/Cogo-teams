const getFclFreightRateExtensionsPayload = ({ values = {}, item = {}, status = 'active' }) => {
	const {
		cluster_id,
		cluster_type,
		cluster_reference_name,
		gri_currency,
		gri_rate,
		line_item_charge_code,
		performed_by_id,
		service_provider_id,
		shipping_line_id,
		trade_type,
		extension_name,
	} = values;

	const payload = {
		id       : item?.id,
		extension_name,
		line_item_charge_code,
		performed_by_id,
		service_provider_id,
		shipping_line_id,
		cluster_id,
		cluster_type,
		cluster_reference_name,
		gri_currency,
		gri_rate : gri_rate ? Number(gri_rate) : undefined,
		status,
		trade_type,
	};
	return payload;
};

export default getFclFreightRateExtensionsPayload;
