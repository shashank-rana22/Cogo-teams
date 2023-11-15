import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useIgnoreAllProcess = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/ignore_all_process',
	}, { manual: true });

	const ignoreApplications = async ({ payload, setShow }) => {
		try {
			await trigger({
				data: {
					...payload,
				},
			});
			refetch();
			setShow(false);
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		ignoreApplications,
	};
};

export default useIgnoreAllProcess;
