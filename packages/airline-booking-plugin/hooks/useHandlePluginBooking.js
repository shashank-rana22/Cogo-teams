import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const EMPTY_VALUE = 0;

const useHandlePluginBooking = (edit = false) => {
	const api = edit ? '/update_awb_plugin_booking_information' : '/create_awb_booking_information';

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const createBooking = async ({
		finalData = {},
		setPluginData = () => {},
		locationData = {},
		refresh = {},
		setEdit = () => {},
	}) => {
		const { setFinalList = () => {}, setPage = () => {}, getAirIndiaAwbNumbersList = () => {} } = refresh || {};
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

		const payload = edit ? { ...FORMATTED_DATA } : { booking_informations: [FORMATTED_DATA] };

		try {
			await trigger({
				data: payload,
			});
			Toast.success('AWB Booking Information Successfully Added');
			setPluginData((prev) => (edit ? [] : [
				...prev,
				{ ...finalData, ...locationData },
			]));
			setFinalList([]);
			setPage(CONSTANTS.START_PAGE);
			getAirIndiaAwbNumbersList();
			if (edit) {
				setEdit(false);
			}
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	const stateBooking = async ({
		statusAwb,
		getAirIndiaAwbNumbersList,
		setFinalList,
		setPage,
		id,
	}) => {
		try {
			if (id) {
				await trigger({
					data: { id, status: statusAwb },
				}).then(() => {
					Toast.success(`AWB Booking Information ${statusAwb}d Successfully`);
					setFinalList([]);
					getAirIndiaAwbNumbersList();
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
