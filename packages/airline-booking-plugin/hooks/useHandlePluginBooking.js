import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const EMPTY_VALUE = 0;

const useHandlePluginBooking = (edit) => {
	const api = edit ? '/update_awb_plugin_booking_information' : '/create_awb_booking_information';

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const createBooking = async ({
		finalData,
		setShowPlugInModal,
		locationData,
		refresh,
	}) => {
		const { setFinalList, setPage, airIndiaAwbNumbersList } = refresh;
		const FORMATTED_DATA = {};
		Object.keys(finalData).forEach((bookInfoKey) => {
			if (['commodity', 'flight_number'].includes(bookInfoKey)) {
				FORMATTED_DATA[bookInfoKey] = finalData[bookInfoKey].toUpperCase();
			} else if (
				['number_of_pieces', 'volume', 'weight'].includes(bookInfoKey)
			) {
				FORMATTED_DATA[bookInfoKey] = Number(finalData[bookInfoKey]) || EMPTY_VALUE;
			} else {
				FORMATTED_DATA[bookInfoKey] = finalData[bookInfoKey];
			}
		});

		try {
			await trigger({
				data: { booking_informations: [FORMATTED_DATA] },
			});
			Toast.success('AWB Booking Information Successfully Added');
			setShowPlugInModal((prev) => [
				...prev,
				{ ...finalData, ...locationData },
			]);
			setFinalList([]);
			setPage(CONSTANTS.START_PAGE);
			airIndiaAwbNumbersList();
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	const stateBooking = async ({
		statusAwb,
		airIndiaAwbNumbersList,
		setFinalList,
		setPage,
		airId,
	}) => {
		try {
			if (airId) {
				await trigger({
					data: { id: airId, status: statusAwb },
				}).then(() => {
					Toast.success(`AWB Booking Information ${statusAwb}d Successfully`);
					setFinalList([]);
					airIndiaAwbNumbersList();
					setPage(CONSTANTS.START_PAGE);
				});
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		createBooking,
		stateBooking,
		loading,
	};
};

export default useHandlePluginBooking;
