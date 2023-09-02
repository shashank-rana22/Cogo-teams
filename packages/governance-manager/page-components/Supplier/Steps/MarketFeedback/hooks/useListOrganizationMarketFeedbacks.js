import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListOrganizationMarketFeedbacks = ({ organization_id, service_id }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_organization_service_market_feedbacks',
	}, { manual: true });

	const listOrganizationMarketFeedbacks = async () => {
		try {
			await trigger({
				params: {
					filters: {
						organization_id,
						service_id,
						status: ['active', 'draft'],
					},
				},
			});
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		listOrganizationMarketFeedbacks();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		listOrganizationMarketFeedbacks,
		data: data?.list,
		loading,
	};
};
export default useListOrganizationMarketFeedbacks;
