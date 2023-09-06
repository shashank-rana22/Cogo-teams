import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

const useDeleteJobClosure = ({ refetch = () => {}, setDeleteModal = () => {} }) => {
	const [{ loading }, trigger] = useRequestBf({
		url    : '/common/job/delete-job-closure-rule',
		method : 'PUT',
	}, { manual: true });

	const apiTrigger = async (params) => {
		try {
			await trigger({ params, data: {} });
			Toast.success('mayank success');
			setDeleteModal(false);
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
