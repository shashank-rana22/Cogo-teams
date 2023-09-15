import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const checkTimeEqual = (timeString, date) => {
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
		if (!isEmpty(oldItem) && shift_id) {
			const { start_time_local: prev_start_time_local, end_time_local: prev_end_time_local } = oldItem;
			if (
				!checkTimeEqual(prev_start_time_local, start_time_local)
				|| !checkTimeEqual(prev_end_time_local, end_time_local)
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

function useUpdateCogooneShift({ getListShift = () => {}, handleClose = () => {} }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const updateTeamsShift = async (payload) => {
		try {
			await trigger(payload);
			getListShift();
			handleClose();
			Toast.success('Timing updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	const createUpdateRequest = ({ formattedValues, prevList }) => {
		const payload = getPayload({ formattedValues, prevList });
		if (isEmpty(payload.data.shift_details)) {
			return false;
		}
		updateTeamsShift(payload);
		return true;
	};
	return {
		createUpdateRequest,
		loading,
	};
}
export default useUpdateCogooneShift;
