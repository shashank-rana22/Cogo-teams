import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useAssignKRAs = ({ inputValue, selectArray }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/assign_kra',
		method : 'post',
	}, { manual: true });

	const onClickSubmitKRAs = async () => {
		try {
			await trigger({
				data: { kras_assigned: inputValue, employee_ids: selectArray },
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	};
	return { onClickSubmitKRAs, loading };
};

export default useAssignKRAs;
