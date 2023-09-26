import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentAdditionalService = ({
	shipmentData = {},
	setIRNGenerated = () => {},
	setShowConfirm = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_additional_service',
		method : 'POST',
	}, { manual: true });

	const createShipmentAdditionalService = async (values) => {
		const { currency = '', terminalChargeReceipt = [] } = values || {};

		let total_tax_price = 0;

		(terminalChargeReceipt || []).forEach((val) => {
			total_tax_price += Number(val.total_tax_price);
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
			buy_price             : Number(total_tax_price),
			price                 : Number(total_tax_price),
			unit                  : 'per_shipment',
			currency,
			service_id            : airFreightLocalService?.id,

		};
		try {
			await trigger({ data: payload });
			setIRNGenerated(false);
			setShowConfirm(false);
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
