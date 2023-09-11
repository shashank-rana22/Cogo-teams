import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

const useDeleteJobClosure = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url    : '/common/job/delete-job-closure-rule',
		method : 'PUT',
		data   : {},
	}, { manual: true });

	const apiTrigger = async (params) => {
		try {
			await trigger({ params });
			Toast.success('Success');
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useDeleteJobClosure;
