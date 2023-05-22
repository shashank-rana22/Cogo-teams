import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

const useGetSubscriptionInfo = ({ editModal = {}, setEditModal }) => {
	const { info = {}, apiCall = false } = editModal || {};
	const { active_subscription = {} } = info || {};

	const [{ loading, data }, trigger] = useRequest({
		method : 'get',
		url    : '/get_saas_subscription_profile',
	}, { manual: true });

	const refetchSubscriptionInfo = (id) => {
		try {
			trigger({
				params: {
					saas_subscription_customer_id: id,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!isEmpty(info) || apiCall) {
			const customerSubId = active_subscription?.saas_subscription_customer_id || '';
			refetchSubscriptionInfo(customerSubId);
		}
	}, [info, apiCall]);

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
