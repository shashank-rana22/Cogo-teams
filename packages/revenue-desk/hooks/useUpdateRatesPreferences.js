import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateRatesPreferences = ({
	supplierPayload,
	inventory,
	serviceData,
	remarks,
	sellRateDetails = [],
}) => {
	const apitoCall = '/create_shipment_booking_confirmation_preference';

	const [{ loading }, trigger] = useRequest({ method: 'POST', url: apitoCall }, { manual: true });

	const updateTrigger = async () => {
		const allPromises = [];
		(serviceData || []).forEach((data) => {
			const service_id = data?.id;
			const service_type = data?.service_type;
			const shipment_id = data?.shipment_id;
			const singleBookingDocs = [];
			const splitableBookingdocs = [];
			const mergeableBookingdocs = [];

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
				shipment_id,
				service_providers         : supplierPayload?.[service_id],
				booking_confirmation_docs : bookingConformationDocs,
				service_id                : service_id || undefined,
				service_type              : service_type || undefined,
				remarks,
				sell_rate_preferences:
					service_type && service_type === 'fcl_freight_service' && sellRateDetails
						? sellRateDetails
						: [],
			};
			const hasData =	supplierPayload?.[service_id]?.length || bookingConformationDocs?.length;

			if (hasData) {
				allPromises.push(
					trigger({
						data: final_payload,
					}),
				);
			}
		});

		const result = await Promise.all(allPromises);

		if (result.includes(null)) {
			Toast.error("Preferences didn't save, Please Try Again");
		} else {
			Toast.success('Preferences Updated');
		}
	};

	return {
		loading,
		updateTrigger,
	};
};

export default useUpdateRatesPreferences;
