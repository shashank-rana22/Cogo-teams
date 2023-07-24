const getSupplierDocuments = (
	all_services = {},
	supplierId = '',
) => {
	const services_provided = all_services?.map((item) => {
		if (item.service_provider_id === supplierId) {
			const serviceObj = {
				service    : item?.service_type,
				trade_type : item?.trade_type,
			};
			return serviceObj;
		}
		return undefined;
	});

	const OPTIONS = [];
	(services_provided || []).forEach((item) => {
		if (
			item?.service === 'air_freight_local_service'
			&& item?.trade_type === 'import'
		) {
			OPTIONS.push({ label: 'Air Local Import', value: 'air_local_import' });
		} else if (
			item?.service === 'air_freight_local_service'
			&& item?.trade_type === 'export'
		) {
			OPTIONS.push({ label: 'Air Local Export', value: 'air_local_export' });
		} else if (
			item?.service === 'air_freight_service'
			&& item?.trade_type === 'export'
		) {
			OPTIONS.push({ label: 'Air Export', value: 'air_export' });
		} else if (
			item?.service === 'air_freight_service'
			&& item?.trade_type === 'import'
		) {
			OPTIONS.push({ label: 'Air Import', value: 'air_import' });
		} else if (
			item?.service === 'air_customs_service'
		) {
			OPTIONS.push({ label: 'Customs', value: 'customs' });
		} else {
			return undefined;
		}
		return OPTIONS;
	});
	return OPTIONS;
};
export default getSupplierDocuments;
