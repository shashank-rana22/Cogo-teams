import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useUpdateMargin = () => {
	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/update_margin',
		},
		{ manual: true },
	);
	const onSubmit = useCallback(async ({ params = {}, data = {} }) => {
		try {
			if (isEmpty(params)) {
				await trigger({ data });
				Toast.success('Margin has been edited sucessfully');
			} else {
				await trigger({ params });
				Toast.success('Margin has been deactivated.');
			}

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
