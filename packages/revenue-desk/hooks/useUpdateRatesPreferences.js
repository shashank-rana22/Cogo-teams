import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

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
	const apitoCall = '/bulk_update_shipment_booking_confirmation_preferences';

	const [{ loading }, trigger] = useRequest({ method: 'POST', url: apitoCall }, { manual: true, autoCancel: false });
	const revenueDeskDecision = [];
	(serviceData || []).forEach((data) => {
		const service_id = data?.id;
		const service_type = data?.service_type;
		const singleBookingDocs = [];
		const splitableBookingdocs = [];
		const mergeableBookingdocs = [];

		const service_providers = [];
		(supplierPayload?.[service_id] || []).forEach((provider, index) => {
			service_providers.push({
				priority                    : index + 1,
				rate_id                     : provider?.rate_id,
				id                          : provider?.id,
				booking_confirmation_status : data?.service_type === 'air_freight_service' ? 'pending' : undefined,
			});
		});
		(inventory?.[service_id] || []).forEach((docs) => {
			const doc_object = {};

			doc_object.ids = docs?.allid?.[0].includes(':')
				? docs?.allid?.[0].split(':')
				: docs.allid;

			doc_object.priority = docs?.priority;
			doc_object.type = docs?.type?.split('_booking')[0];
			if (docs?.type === 'single_booking_notes') {
				singleBookingDocs.push(doc_object);
			}
			if (docs?.type === 'splitable_booking_notes') {
				splitableBookingdocs.push(doc_object);
			}
			if (docs?.type === 'mergeable_booking_notes') {
				mergeableBookingdocs.push(doc_object);
			}
		});
		const bookingConformationDocs = [];
		const confirmationDocs = [
			...singleBookingDocs,
			...mergeableBookingdocs,
			...splitableBookingdocs,
		];
		(confirmationDocs || []).forEach((docs, index) => {
			const doc_object = docs;
			doc_object.priority = index + 1;
			bookingConformationDocs.push(doc_object);
		});

		const final_payload = {
			is_final                  : true,
			// shipment_id,
			service_providers,
			booking_confirmation_docs : bookingConformationDocs,
			service_id                : service_id || undefined,
			service_type              : service_type || undefined,
			// remarks                   : othertext || reason,
			available_rates_for_rd    : rateOptions?.[service_id],
			sell_rate_preferences:
					service_type && service_type === 'fcl_freight_service' && sellRateDetails?.[service_id]
						? sellRateDetails?.[service_id]
						: [],
		};
		const hasData =	supplierPayload?.[service_id]?.length || bookingConformationDocs?.length;

		if (hasData) {
			revenueDeskDecision.push(final_payload);
		}
	});

	const updateTrigger = async () => {
		try {
			await trigger({
				data: {
					shipment_id           : shipmentData?.id,
					remarks               : othertext || reason,
					revenue_desk_decisions : revenueDeskDecision,

				},
			});
			Toast.success('Preferences Updated');
			setShowDetailPage(null);
		} catch (err) {
			// console.log(err);
			Toast.error("Preferences didn't save, Please Try Again");
		}
	};

	return {
		loading,
		updateTrigger,
	};
};

export default useUpdateRatesPreferences;
