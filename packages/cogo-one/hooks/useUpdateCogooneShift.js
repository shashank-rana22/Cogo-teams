import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const compareTime = (timeString, date) => {
	const [hr, mn] = timeString.split(':');
	if (
		Number(hr) === Number(date.getHours())
		&& Number(mn) === Number(date.getMinutes())
	) { return true; }
	return false;
};
const getPayload = ({ formattedValues, prevList }) => {
	const PAYLOAD = [];
	formattedValues.forEach((valueItem) => {
		const { shift_id, start_time_local, end_time_local } = valueItem;
		const [oldItem] = prevList.filter(({ id }) => id === shift_id);
		if (!isEmpty(oldItem)) {
			const { start_time_local: prev_start_time_local, end_time_local: prev_end_time_local } = oldItem;
			if (
				!compareTime(prev_start_time_local, start_time_local)
				|| !compareTime(prev_end_time_local, end_time_local)
			) {
				PAYLOAD.push({
					shift_id,
					start_time_local : String(start_time_local),
					end_time_local   : String(end_time_local),
				});
			}
		}
	});
	return {
		data: {
			shift_details: PAYLOAD,
		},
	};
};

function useUpdateCogooneShift({ getListShift = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const updateTeamsShift = async (payload) => {
		try {
			await trigger(payload);
			getListShift();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	const createUpdateRequest = ({ formattedValues, prevList }) => {
		const payload = getPayload({ formattedValues, prevList });
		if (isEmpty(payload.data.shift_details)) {
			Toast.error('No values changed!');
		} else {
			updateTeamsShift(payload);
		}
	};
	return {
		createUpdateRequest,
		loading,
	};
}
export default useUpdateCogooneShift;
