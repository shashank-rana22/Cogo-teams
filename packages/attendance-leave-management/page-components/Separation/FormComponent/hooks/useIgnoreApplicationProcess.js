import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useIgnorepApplicationProcess = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/ignore_application_process',
	}, { manual: true });

	const ignoreApplication = async ({ process_list, ignored_reason, setShow }) => {
		try {
			await trigger({
				data: {
					process_list,
					ignored_reason,
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
		ignoreApplication,
	};
};

export default useIgnorepApplicationProcess;
