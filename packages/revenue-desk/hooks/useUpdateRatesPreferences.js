import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import { DEFAULT_INDEX, INCREMENT_BY_ONE } from '../page-components/constants';

const useUpdateRatesPreferences = ({
	supplierPayload,
	inventory,
	serviceData,
	reason,
	othertext,
	sellRateDetails = {},
	rateOptions,
	setShowDetailPage,
	shipmentData,
}) => {
	const API_TO_CALL = '/bulk_update_shipment_booking_confirmation_preferences';

	const [{ loading }, trigger] = useRequest({
		method: 'POST', url: API_TO_CALL,
	}, { manual: true, autoCancel: false });
	const REVENUE_DESK_DECISION = [];
	(serviceData || []).forEach((data) => {
		const service_id = data?.id;
		const service_type = data?.service_type;
		const SINGLE_BOOKING_DOCS = [];
		const SPLITABLE_BOOKING_DOCS = [];
		const MERGEABLE_BOOKING_DOCS = [];

		const SERVICE_PROVIDERS = [];
		(supplierPayload?.[service_id] || []).forEach((provider, index) => {
			SERVICE_PROVIDERS.push({
				priority                    : index + INCREMENT_BY_ONE,
				rate_id                     : provider?.rate_id,
				id                          : provider?.id,
				validity_id                 : provider?.validity_id,
				booking_confirmation_status : data?.service_type === 'air_freight_service' ? 'pending' : undefined,
			});
		});
		(inventory?.[service_id] || []).forEach((docs) => {
			const DOC_OBJECT = {};

			DOC_OBJECT.ids = docs?.allid?.[DEFAULT_INDEX].includes(':')
				? docs?.allid?.[DEFAULT_INDEX].split(':')
				: docs.allid;

			DOC_OBJECT.priority = docs?.priority;
			DOC_OBJECT.type = docs?.type?.split('_booking')[DEFAULT_INDEX];
			if (docs?.type === 'single_booking_notes') {
				SINGLE_BOOKING_DOCS.push(DOC_OBJECT);
			}
			if (docs?.type === 'splitable_booking_notes') {
				SPLITABLE_BOOKING_DOCS.push(DOC_OBJECT);
			}
			if (docs?.type === 'mergeable_booking_notes') {
				MERGEABLE_BOOKING_DOCS.push(DOC_OBJECT);
			}
		});
		const BOOKING_CONFIRMATION_DOCS = [];
		const confirmationDocs = [
			...SINGLE_BOOKING_DOCS,
			...MERGEABLE_BOOKING_DOCS,
			...SPLITABLE_BOOKING_DOCS,
		];
		(confirmationDocs || []).forEach((docs, index) => {
			const DOC_OBJECT = docs;
			DOC_OBJECT.priority = index + INCREMENT_BY_ONE;
			BOOKING_CONFIRMATION_DOCS.push(DOC_OBJECT);
		});

		const final_payload = {
			is_confirmation_set_by_rd : true,
			service_providers         : SERVICE_PROVIDERS,
			booking_confirmation_docs : BOOKING_CONFIRMATION_DOCS,
			service_id                : service_id || undefined,
			service_type              : service_type || undefined,
			available_rates_for_rd    : rateOptions?.[service_id],
			sell_rate_preferences:
					service_type && service_type === 'fcl_freight_service' && sellRateDetails?.[service_id]
						? sellRateDetails?.[service_id]
						: [],
		};
		const hasData =	supplierPayload?.[service_id]?.length || BOOKING_CONFIRMATION_DOCS?.length;

		if (hasData) {
			REVENUE_DESK_DECISION.push(final_payload);
		}
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
