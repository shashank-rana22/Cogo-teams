import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const PLAN_LIST_PAGE_LIMIT = 50;

const useUpdatePlan = ({ planId, modalChangeHandler, featureInfo = {} }) => {
	const { id:subscriptionId, ...rest } = featureInfo || {};

	const [{ loading, data: listData }] = useRequest({
		method : 'get',
		url    : '/list_saas_plan_pricings',
		params : {
			filters: {
				is_active : true,
				plan_type : 'P',
				...rest,
			},
			page_limit: PLAN_LIST_PAGE_LIMIT,
		},
	}, { manual: false });

	const [{ loading: postLoading }, postTrigger] = useRequest({
		method : 'post',
		url    : '/update_saas_subscription',
	}, { manual: true });

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
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [modalChangeHandler, planId, postTrigger, subscriptionId]);

	return {
		loading: loading || postLoading, changePlanHandler, listData,
	};
};

export default useUpdatePlan;
