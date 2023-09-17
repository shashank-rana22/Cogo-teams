import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useCreateMargin = () => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/create_margin',
		},
		{ manual: true },
	);
	const onSubmit = useCallback(async ({ data = {} }) => {
		try {
			await trigger({ data });
			Toast.success('Margin created successfully');
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	return {
		loading,
		onSubmit,
	};
};
export default useCreateMargin;
