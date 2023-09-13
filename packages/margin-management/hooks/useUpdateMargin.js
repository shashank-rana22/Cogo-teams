import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateMargin = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url: '/update_margin',
		},
		{ manual: true },
	);
	const onSubmit = useCallback(async ({ params }) => {
		try {
			await trigger({ params });
			Toast.success('Margin has been deactivated.');
			return true;
		} catch (err) {
			toastApiError(err);
			return false;
		}
	}, [trigger]);

	return {
		loading,
		onSubmit,
	};
};
export default useUpdateMargin;
