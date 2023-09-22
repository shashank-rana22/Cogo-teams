import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const getPayload = ({ team_name, formattedValues }) => {
	let shiftDetails = [];

	const filteredList = formattedValues.filter(({ shift_id }) => !shift_id);

	filteredList.forEach((itm) => {
		const { shift_name, start_time_local, end_time_local } = itm || {};

		if (start_time_local && end_time_local) {
			shiftDetails = [
				...shiftDetails,
				{
					shift_name,
					start_time_local,
					end_time_local,
				},
			];
		}
	});

	return {
		team_name,
		shift_details: shiftDetails,
	};
};

const useCreateBulkCogooneShift = ({ handleClose = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_bulk_cogoone_shift',
		method : 'post',
	}, { manual: true });

	const createCogooneShift = async ({ payload }) => {
		try {
			await trigger({ data: payload });
			Toast.success('Shifts created successfully');
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Something Went Wrong');
		}
	};

	const createCogooneShiftRequest = async ({
		team_name,
		formattedValues,
	}) => {
		const payload = getPayload({ team_name, formattedValues });

		if (!isEmpty(payload.shift_details)) {
			await createCogooneShift({ payload });
		}

		handleClose();
	};

	return {
		createCogooneShiftRequest,
		loading,
	};
};

export default useCreateBulkCogooneShift;
