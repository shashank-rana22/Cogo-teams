import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetOrganization = ({ primary_service = {} }) => {
	const [{ loading, data: orgData }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'GET',
		params : {

			id: primary_service?.service_provider?.id,

		},
	}, { manual: true });

	const getTradeData = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getTradeData();
	}, [getTradeData]);

	return {
		loading,
		orgData,
		orgRefetch: getTradeData,
	};
};
export default useGetOrganization;
