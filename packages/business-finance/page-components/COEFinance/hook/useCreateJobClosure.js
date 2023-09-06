import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

const useCreateJobClosure = ({ refetch = () => {}, setOpenModal = () => {} }) => {
	const [trigger] = useRequestBf({
		url    : '/common/job/create-job-closure-rule',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (params) => {
		try {
			await trigger({ data: params });
			Toast.success('mayank success');
			setOpenModal(false);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
	};
};

export default useCreateJobClosure;
