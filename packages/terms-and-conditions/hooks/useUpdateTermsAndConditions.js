import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utlis/toastApiError';

const useTermsAndConditions = ({ status = 'active', id = null, refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_terms_and_condition',
	}, { manual: true });

	const onSubmit = async () => {
		try {
			await trigger({
				data: {
					id,
					status: status === 'active' ? 'inactive' : 'active',
				},
			});

			Toast.success('Status updated successfully');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useTermsAndConditions;
