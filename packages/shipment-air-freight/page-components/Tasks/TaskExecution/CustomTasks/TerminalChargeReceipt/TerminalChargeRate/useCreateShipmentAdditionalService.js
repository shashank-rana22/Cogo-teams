import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentAdditionalService = ({ shipmentData, setIRNGenerated }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_additional_service',
		method : 'POST',
	}, { manual: true });

	const createShipmentAdditionalService = async () => {
		const payload = {

			name                  : 'Terminal HandlingCharges',
			code                  : 'THC',
			shipment_id           : shipmentData?.id,
			service_type          : 'air_freight_local_service',
			is_rate_available     : true,
			state                 : 'accepted_by_importer_exporter',
			add_to_sell_quotation : true,

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
