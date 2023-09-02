import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

const API_NAME = {
	fcl_freight : 'delete_fcl_freight_rate_job',
	air_freight : 'delete_air_freight_rate_job',
};

const useDeleteRateJob = ({ service = 'fcl_freight', data = {} }) => {
	const { id = '' } = data;

	const endPoint = API_NAME[service];

	const [checkboxValue, setCheckboxValue] = useState([]);

	const [{ loading }, trigger] = useRequest({
		url    : endPoint,
		method : 'POST',
	}, { manual: true });

	const deleteRateJob = useCallback(async (otherReason) => {
		let closing_remarks = [];
		if (checkboxValue) {
			closing_remarks = [...checkboxValue];
		}
		if (otherReason) {
			closing_remarks = [...closing_remarks, otherReason];
		}
		try {
			await trigger({
				data: {
					id,
					closing_remarks,
				},
			});
		} catch (err) {
			// console.log(err);
			Toast.error('failed to cancel');
		}
	}, [trigger, id, checkboxValue]);

	return {
		loading,
		deleteRateJob,
		checkboxValue,
		setCheckboxValue,
	};
};

export default useDeleteRateJob;
