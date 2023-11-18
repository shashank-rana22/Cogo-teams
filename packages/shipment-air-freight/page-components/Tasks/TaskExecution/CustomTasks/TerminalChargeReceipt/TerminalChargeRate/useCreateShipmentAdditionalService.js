import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const DEFAULT_VALUE = 0;

const useCreateShipmentAdditionalService = ({
	shipmentData = {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_additional_service',
		method : 'POST',
	}, { manual: true });

	const createShipmentAdditionalService = async (values) => {
		const { currency = '', terminalChargeReceipt = [] } = values || {};

		let price = 0;
		let tax_price = 0;

		(terminalChargeReceipt || []).forEach((val) => {
			price += Number(val?.price || DEFAULT_VALUE);
			tax_price += Number(val?.tax_price || DEFAULT_VALUE);
		});
		const { id = '', all_services = [] } = shipmentData || {};

		const airFreightLocalService = all_services.find((
			item,
		) => item?.service_type === 'air_freight_local_service');

		const payload = {
			name                  : 'Terminal HandlingCharges',
			code                  : 'THC',
			shipment_id           : id,
			service_type          : 'air_freight_local_service',
			is_rate_available     : true,
			state                 : 'accepted_by_importer_exporter',
			add_to_sell_quotation : true,
			quantity              : 1,
			buy_price             : Number(price),
			price                 : Number(price),
			tax_amount            : tax_price,
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
