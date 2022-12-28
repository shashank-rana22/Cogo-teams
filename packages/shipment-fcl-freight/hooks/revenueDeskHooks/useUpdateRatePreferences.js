import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateRatesPrefrences = (payloads) => {
	const apitoCall = '/create_shipment_booking_confirmation_preference';
	const successMessage = 'Updated';
	const {
		existingRatePrefrences,
		flashRatesPrefrences,
		setShow = () => {},
		shipment_id,
		setShowBookingOption,
		refetch = () => {},
		service,
	} = payloads;

	const { service_providers } = flashRatesPrefrences;

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

	const final_payload = {
		shipment_id,
		service_providers,
		booking_confirmation_docs : bookingConformationDocs,
		service_id                : service?.id || undefined,
		service_type              : service?.service_type || undefined,
	};

	const [{ data:internalStakeHoldersList, loading }, trigger] = useRequest(
		{ url: apitoCall, method: 'post' },
		{ manual: true },
	);

	const upateTrigger = async () => {
		const hasData =			service_providers?.length || bookingConformationDocs?.length;
		if (hasData) {
			try {
				const res = await trigger({
					data: final_payload,
				});
				if (!res.hasError) {
					Toast.success(successMessage);
					setShowBookingOption(false);
					setShow(false);
					refetch();
				} else {
					setShow(false);
					Toast.error('Something went wrong', <Partial>{postion= "top-center"}</Partial>);
				}
			} catch (error) {
				Toast.error(error);
				setShow(false);
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

export default useUpdateRatesPrefrences;
