import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const EMPTY_VALUE = 0;

const useCreatePluginBooking = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_awb_booking_information',
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

	return {
		createBooking,
		loading,
	};
};

export default useCreatePluginBooking;
