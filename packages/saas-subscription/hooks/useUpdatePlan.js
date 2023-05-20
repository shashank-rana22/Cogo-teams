import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const PLAN_LIST_PAGE_LIMIT = 50;

const useUpdatePlan = ({ plan, subscriptionId, modalChangeHandler }) => {
	const [{ loading, data: listData }, listTrigger] = useRequest({
		method : 'get',
		url    : '/list_saas_plan_pricings',
	}, { manual: true });

	const [{ loading: postLoading }, postTrigger] = useRequest({
		method : 'post',
		url    : '/update_saas_subscription',
	}, { manual: true });

	const getPlanList = () => {
		try {
			listTrigger({
				params: {
					filters    : { is_active: true, plan_type: 'P' },
					page_limit : PLAN_LIST_PAGE_LIMIT,
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
			modalChangeHandler(true);
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
