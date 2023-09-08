import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

const useCreateJobClosure = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url    : '/common/job/create-job-closure-rule',
		method : 'POST',
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

export default useCreateJobClosure;
