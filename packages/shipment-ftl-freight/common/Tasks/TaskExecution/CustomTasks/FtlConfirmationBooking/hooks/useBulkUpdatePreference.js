import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useBulkUpdatePreference = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/bulk_update_shipment_booking_confirmation_preferences',
		method : 'POST',
	}, { manual: true });

	const updateConfirmation = async ({ selectedPriorities, newRates, callback }) => {
		const priorities = Object.values(selectedPriorities || {}).map((item) => {
			const preference = newRates?.find(
				(rate) => rate.service_id === item.service_id,
			) || {};
			return {
				id                : preference?.preference_id,
				selected_priority : item.priority,
			};
		});
		try {
			await trigger({ data: { selected_priorities: priorities } });
			callback();
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		updateConfirmation,
		loading,
	};
};

export default useBulkUpdatePreference;
