import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError';

const useDeleteJobClosure = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url     : '/common/job/delete-job-closure-rule',
		method  : 'PUT',
		authKey : 'put_common_job_delete_job_closure_rule',
	}, { manual: true });

	const apiTrigger = async (params) => {
		try {
			await trigger({ data: params });
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
