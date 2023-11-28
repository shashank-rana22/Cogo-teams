import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentAdditionalService = ({
	shipmentData = {},
	type = 'terminal',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_additional_service',
		method : 'POST',
	}, { manual: true });

	const createShipmentAdditionalService = async (values, index) => {
		const { currency = '' } = values || {};

		const { id = '', all_services = [] } = shipmentData || {};

		const airFreightLocalService = all_services.find((
			item,
		) => item?.service_type === 'air_freight_local_service');

		const payload = {
			name                  : type === 'terminal' ? 'Terminal Handling Charges' : 'Gatepass Charges',
			code                  : type === 'terminal' ? 'THC' : 'GIC',
			shipment_id           : id,
			service_type          : 'air_freight_local_service',
			is_rate_available     : true,
			state                 : 'accepted_by_importer_exporter',
			add_to_sell_quotation : true,
			quantity              : 1,
			buy_price             : values?.price || Number(values?.[`price_${index}`]),
			price                 : values?.price || Number(values?.[`price_${index}`]),
			tax_amount            : values?.tax_price || Number(values?.[`tax_price_${index}`]),
			unit                  : 'per_shipment',
			currency,
			service_id            : airFreightLocalService?.id,

		};
		try {
			await trigger({ data: payload });
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		createShipmentAdditionalService,
	};
};

export default useCreateShipmentAdditionalService;
