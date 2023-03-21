import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';

const usePublishDraft = ({ setShowPublishModal = () => {} }) => {
	const [{ loading }, trigger] = useAllocationRequest({
		method  : 'POST',
		url     : '/kam_expertise_publishability',
		authkey : 'post_allocation_kam_expertise_publishability',
	}, { manual: true });

	const onCreate = async () => {
		try {
			const payload = {
				status: 'live',
			};

			await trigger({
				data: payload,
			});

			setShowPublishModal(false);

			Toast.success('Version Published Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		onCreate,
		loading,
	};
};

export default usePublishDraft;
