import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import { DEFAULT_INDEX, INCREMENT_BY_ONE } from '../page-components/constants';

const useUpdateRatesPreferences = ({
	supplierPayload,
	// inventory,
	serviceData,
	reason,
	othertext,
	sellRateDetails = {},
	setShowDetailPage,
	shipmentData,
}) => {
	const API_TO_CALL = '/bulk_update_shipment_booking_confirmation_preferences';

	const [{ loading }, trigger] = useRequest({
		method: 'POST', url: API_TO_CALL,
	}, { manual: true, autoCancel: false });
	const REVENUE_DESK_DECISION = [];

	const preference_set_ids = Object.keys(supplierPayload || {});

	preference_set_ids.forEach((service_id) => {
		const service = serviceData.find((serviceItem) => serviceItem.id === service_id);
		let similarServices = [];
		if (service.service_type === 'ftl_freight_service') {
			similarServices = serviceData.filter(
				(serviceItem) => serviceItem.id !== service_id && serviceItem.truck_type === service.truck_type,
			).map((serviceItem) => serviceItem.id);
		}
		const selectedRates = supplierPayload?.[service_id] || [];
		const SERVICE_PROVIDERS = [];
		(selectedRates).forEach((provider, index) => {
			SERVICE_PROVIDERS.push({
				priority                    : index + INCREMENT_BY_ONE,
				rate_id                     : provider?.rate_id,
				id                          : provider?.id,
				validity_id                 : provider?.validity_id,
				booking_confirmation_status : service?.service_type === 'air_freight_service' ? 'pending' : undefined,
			});
		});
		const { service_type } = service;
		const final_payload = {
			service_providers               : SERVICE_PROVIDERS,
			booking_confirmation_docs       : [],
			service_id                      : service_id || undefined,
			service_type                    : service.service_type || undefined,
			set_similar_services_preference : similarServices.length > DEFAULT_INDEX,
			similar_service_ids             : similarServices,
			sell_rate_preferences:
					service_type && service_type === 'fcl_freight_service' && sellRateDetails?.[service_id]
						? sellRateDetails?.[service_id]
						: [],
		};
		REVENUE_DESK_DECISION.push(final_payload);
	});

	const updateTrigger = async () => {
		try {
			await trigger({
				data: {
					shipment_id            : shipmentData?.id,
					remarks                : othertext || reason,
					revenue_desk_decisions : REVENUE_DESK_DECISION,

				},
			});
			Toast.success('Preferences Updated');
			setShowDetailPage(null);
		} catch (err) {
			Toast.error("Preferences didn't save, Please Try Again");
		}
	};

	return {
		loading,
		updateTrigger,
	};
};

export default useUpdateRatesPreferences;
