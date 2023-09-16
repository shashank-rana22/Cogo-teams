const fclFreightRateFormatter = ({ values = {}, item = {} }) => {
	const payload = {
		id                     : item?.id || undefined,
		extension_name         : values?.extension_name || undefined,
		line_item_charge_code  : values?.line_item_charge_code || undefined,
		performed_by_id        : values.performed_by_id || undefined,
		service_provider_id    : values?.service_provider_id || undefined,
		shipping_line_id       : values?.shipping_line_id || undefined,
		cluster_id             : values?.cluster_id || undefined,
		cluster_type           : values?.cluster_type || undefined,
		cluster_reference_name : values?.cluster_reference_name,
		gri_currency           : values?.gri_currency || undefined,
		gri_rate               : values?.gri_rate ? Number(values?.gri_rate) : undefined,
		status                 : values?.status || undefined,
		trade_type             : values?.trade_type || undefined,
	};
	return payload;
};

export default fclFreightRateFormatter;
