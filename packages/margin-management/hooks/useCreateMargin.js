import { Toast } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useCreateMargin = () => {
	const router = useRouter();

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
			router.push('/margins');
		} catch (err) {
			toastApiError(err);
		}
	}, [router, trigger]);

	return {
		loading,
		onSubmit,
	};
};
export default useCreateMargin;
