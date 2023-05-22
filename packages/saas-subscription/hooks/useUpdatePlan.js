import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const PLAN_LIST_PAGE_LIMIT = 50;

const useUpdatePlan = ({ planId, subscriptionId, modalChangeHandler }) => {
	const [{ loading, data: listData }, listTrigger] = useRequest({
		method : 'get',
		url    : '/list_saas_plan_pricings',
	}, { manual: true });

	const [{ loading: postLoading }, postTrigger] = useRequest({
		method : 'post',
		url    : '/update_saas_subscription',
	}, { manual: true });

	const getPlanList = useCallback(() => {
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
	}, [listTrigger]);

	const changePlanHandler = useCallback(async () => {
		try {
			await postTrigger({
				data: {
					id              : subscriptionId,
					plan_pricing_id : planId,
				},
			});
			modalChangeHandler(true);
		} catch (err) {
			console.log(err);
		}
	}, [modalChangeHandler, planId, postTrigger, subscriptionId]);

	useEffect(() => {
		getPlanList();
	}, [getPlanList]);

	return {
		loading: loading || postLoading, changePlanHandler, listData,
	};
};

export default useUpdatePlan;
