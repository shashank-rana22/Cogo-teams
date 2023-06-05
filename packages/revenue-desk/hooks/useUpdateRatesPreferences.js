import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateRatesPreferences = ({
	supplierPayload, shipmentId, existingRatePrefrences, itemData, remarks,
	sellRateDetails = [],
}) => {
	const { scope } = useSelector(({ general }) => ({
		query : general?.query,
		scope : general?.scope,
	}));
	const apitoCall = '/create_shipment_booking_confirmation_preference';
	const successMessage = 'Updated';
	const singleBookingDocs = [];
	const splitableBookingdocs = [];
	const mergeableBookingdocs = [];

	(existingRatePrefrences || []).forEach((docs) => {
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

	const { service_type = '' } = itemData;
	const final_payload = {
		is_final                  : true,
		shipment_id               : shipmentId,
		service_providers         : supplierPayload?.service_providers,
		booking_confirmation_docs : bookingConformationDocs,
		service_id                : itemData?.id || undefined,
		service_type              : itemData?.service_type || undefined,
		remarks,
		sell_rate_preferences:
			service_type && service_type === 'fcl_freight_service' && sellRateDetails
				? sellRateDetails
				: [],
	};

	const { loading, trigger } = useRequest('post', false, scope)(apitoCall);
	const upateTrigger = async () => {
		const hasData =	supplierPayload?.service_providers?.length || bookingConformationDocs?.length;
		if (hasData) {
			try {
				const res = await trigger({
					data: final_payload,
				});
				if (!res.hasError) {
					Toast.success(successMessage);
					// setShowBookingOption(false);
					// setShow(false);
					// refetch();
				} else {
					// setShow(false);
					Toast.error('Something went wrong');
				}
			} catch (error) {
				// console.log(error);
				// setShow(false);
			}
		} else {
			Toast.warn('Please Choose Your Prefrences');
		}
	};

	return {
		loading,
		upateTrigger,
	};
};

export default useUpdateRatesPreferences;
