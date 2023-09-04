import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetEmailPreview = () => {
	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_rolling_forecast_email_preview',
		method : 'GET',
	}, { manual: true });

	const getEmailPreview = useCallback(({
		organization_id = '',
	}) => {
		try {
			trigger({
				params: {
					organization_id,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [trigger]);

	return {
		data,
		loading,
		getEmailPreview,
	};
};

export default useGetEmailPreview;
