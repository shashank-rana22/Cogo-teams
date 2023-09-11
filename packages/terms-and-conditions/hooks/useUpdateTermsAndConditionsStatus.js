import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../utlis/toastApiError';

const useTermsAndConditions = ({ status = 'active', id = null, refetch = () => {} }) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		scope,
		url    : '/update_terms_and_condition',
	}, { manual: true });

	const onSubmit = async () => {
		try {
			const payload = {
				id,
				status: status === 'active' ? 'inactive' : 'active',
			};

			await trigger({
				data: payload,
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
