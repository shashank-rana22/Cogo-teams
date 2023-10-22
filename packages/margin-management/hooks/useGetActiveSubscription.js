import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

function useGetActiveSubscription({
	organization_id = '',
	organization_type = 'importer_exporter',
	formValues = {},
}) {
	const [{ loading: loadingListSaas, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_saas_plans',
	}, {
		manual: false,
	});

	const [{ loading, data: activeSubscriptionData }, activeSubTrigger] = useRequest({
		method : 'GET',
		url    : '/get_active_subscription',
	}, {
		manual: false,
	});

	const getListSaasPlans = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						customer_type : organization_type,
						is_active     : true,
					},
					promotion_discount_data_required: true,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	}, [organization_type, trigger]);

	const getPlanData = useCallback(async () => {
		try {
			await activeSubTrigger({
				params: {
					organization_id,
				},
			});
		} catch (error) {
			// console.log(error);
		}
	}, [activeSubTrigger, organization_id]);

	const NAME_MAPPING = {
		CogoLite      : 'cogolite',
		CogoAnchor    : 'cogoanchor',
		CogoCaptain   : 'cogocaptain',
		CogoFreighter : 'cogofreighter',
		default       : 'cogolite',
	};

	const modifiedPlanName = NAME_MAPPING[activeSubscriptionData?.plan_name || 'default'];

	const { promotion_discounts = [] } = (data?.list || []).find(
		(plan) => plan?.plan_name === modifiedPlanName,
	) || {};

	// const servicesWithDiscounts = (promotion_discounts || []).map(
	// 	(i) => i.service_name,
	// );

	const discountedDataForSelectedService = (promotion_discounts || []).find(
		(discount) => discount?.service_name === formValues?.service,
	) || {};

	useEffect(() => {
		if (organization_id) getPlanData();
	}, [getPlanData, organization_id]);

	useEffect(() => {
		if (organization_type) getListSaasPlans();
	}, [getListSaasPlans, organization_type]);

	return {
		activeSubscriptionData,
		loading,
		saasPlansData: data,
		loadingListSaas,
		discountedDataForSelectedService,
	};
}

export default useGetActiveSubscription;
