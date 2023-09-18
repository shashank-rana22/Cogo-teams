import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const checkTimeEqual = ({
	timeString = '',
	date = {},
}) => {
	const [hour, minute] = timeString.split(':');

	if (
		Number(hour) === Number(date.getHours())
		&& Number(minute) === Number(date.getMinutes())
	) {
		return true;
	}

	return false;
};

const getPayload = ({ formattedValues = [], prevList = [] }) => {
	let filteredData = [];

	formattedValues.forEach((valueItem) => {
		const { shift_id, start_time_local, end_time_local } = valueItem;

		const [oldItem] = prevList.filter(({ id }) => id === shift_id);

		if (!isEmpty(oldItem) && shift_id) {
			const {
				start_time_local: prev_start_time_local,
				end_time_local: prev_end_time_local,
			} = oldItem;

			if (
				!checkTimeEqual({ timeString: prev_start_time_local, date: start_time_local })
				|| !checkTimeEqual({ timeString: prev_end_time_local, date: end_time_local })
			) {
				filteredData = [
					...filteredData,
					{
						shift_id,
						start_time_local : String(start_time_local),
						end_time_local   : String(end_time_local),
					},
				];
			}
		}
	});

	return {
		shift_details: filteredData,
	};
};

function useUpdateCogooneShift() {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const updateTeamsShift = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			Toast.success('Timing updated successfully');
		} catch (error) {
			Toast.error(
				getApiErrorString(error?.response?.data)
				|| 'Something Went Wrong',
			);
		}
	};

	const createUpdateRequest = async ({ formattedValues, prevList }) => {
		const payload = getPayload({ formattedValues, prevList });

		if (!isEmpty(payload.shift_details)) {
			await updateTeamsShift({ payload });
		}
	};

	return {
		createUpdateRequest,
		loading,
	};
}

export default useUpdateCogooneShift;
