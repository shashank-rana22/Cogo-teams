import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentAdditionalService = ({ shipmentData, setIRNGenerated, lineItemDetails }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_additional_service',
		method : 'POST',
	}, { manual: true });

	const createShipmentAdditionalService = async () => {
		const { id = '', all_services = [] } = shipmentData || {};

		const airFreightLocalService = all_services.filter((
			item,
		) => item?.service_type === 'air_freight_local_service');

		const { total_tax_price = '', currency = '' } = lineItemDetails;
		const payload = {
			name                  : 'Terminal HandlingCharges',
			code                  : 'THC',
			shipment_id           : id,
			service_type          : 'air_freight_local_service',
			is_rate_available     : true,
			state                 : 'accepted_by_importer_exporter',
			add_to_sell_quotation : true,
			quantity              : 1,
			buy_price             : Number(total_tax_price),
			price                 : Number(total_tax_price),
			unit                  : 'per_shipment',
			currency,
			service_id            : airFreightLocalService?.id,

		};
		try {
			await trigger({ data: payload });
			setIRNGenerated(false);
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
