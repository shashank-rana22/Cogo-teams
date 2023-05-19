import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useUpdatePlan = ({ plan, subscriptionId, successHandler }) => {
	const [{ loading, data: listData }, listTrigger] = useRequest({
		method : 'get',
		url    : '/list_saas_plan_pricings',
	}, { manual: true });

	const [{ loading: postLoading }, postTrigger] = useRequest({
		method : 'post',
		url    : '/update_saas_subscription',
	}, { manual: true });

	const getPlanList = async () => {
		try {
			await listTrigger({
				params: {
					filters    : { is_active: true, plan_type: 'P' },
					page_limit : 50,
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	const changePlanHandler = async () => {
		try {
			await postTrigger({
				data: {
					id              : subscriptionId,
					plan_pricing_id : plan,
				},
			});
			successHandler();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPlanList();
	}, []);

	return {
		loading: loading || postLoading, changePlanHandler, listData,
	};
};

export default useUpdatePlan;
