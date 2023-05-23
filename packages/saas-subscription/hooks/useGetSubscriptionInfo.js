import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useMemo } from 'react';

const useGetSubscriptionInfo = ({ editModal = {}, setEditModal }) => {
	const { info = {}, apiCall = false } = editModal || {};
	const { active_subscription = {} } = info || {};

	const customerSubId = useMemo(() => (
		active_subscription?.saas_subscription_customer_id || ''
	), [active_subscription]);

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_subscription_profile',
	}, { manual: true });

	const refetchSubscriptionInfo = useCallback((id) => {
		try {
			trigger({
				params: {
					saas_subscription_customer_id: id,
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [trigger]);

	useEffect(() => {
		if (!isEmpty(info)) {
			refetchSubscriptionInfo(customerSubId);
		}
	}, [info, refetchSubscriptionInfo, customerSubId]);

	useEffect(() => {
		if (apiCall) {
			console.log(apiCall, 'apiCall');
			refetchSubscriptionInfo(customerSubId);
		}
	}, [apiCall, customerSubId, refetchSubscriptionInfo]);

	const editModalChangeHandler = (key, value) => {
		setEditModal((prev) => ({
			...prev,
			openEditFeatureModal : true,
			[key]                : true,
			featureInfo          : value,
			apiCall              : false,
		}));
	};
	const closeModalHandler = () => {
		setEditModal({ open: false });
	};

	return {
		loading, subInfo: data, editModalChangeHandler, closeModalHandler,
	};
};

export default useGetSubscriptionInfo;
