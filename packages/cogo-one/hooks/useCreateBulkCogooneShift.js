import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({ team_name, formattedValues }) => {
	const PAYLOAD = [];
	const filteredList = formattedValues.filter(({ shift_id }) => !shift_id);
	filteredList.forEach(({ shift_name, start_time_local, end_time_local }) => {
		if (start_time_local && end_time_local) {
			PAYLOAD.push({
				shift_name,
				start_time_local : String(start_time_local),
				end_time_local   : String(end_time_local),
			});
		}
	});
	return {
		data: {
			team_name,
			shift_details: PAYLOAD,
		},
	};
};

const useCreateBulkCogooneShift = ({ handleClose = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const createCogooneShift = (payload) => {
		try {
			trigger(payload);
			handleClose();
			Toast.success(' Shift created successfully');
		} catch (e) {
			console.error(e);
		}
	};

	const createCogooneShiftRequest = ({ team_name, formattedValues }) => {
		const payload = getPayload({ team_name, formattedValues });
		if (isEmpty(payload.data.shift_details)) {
			return false;
		}
		createCogooneShift(payload);
		return true;
	};

	return {
		createCogooneShiftRequest,
		loading,
	};
};
export default useCreateBulkCogooneShift;
