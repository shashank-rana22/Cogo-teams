import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

const getParams = ({ agentId = '' }) => ({
	page_limit : 6,
	filters    : {
		agent_id : agentId,
		status   : 'active',
	},
});

const useListOmnichannelOnboardingRequests = () => {
	const { agentId = '' } = useSelector(({ profile }) => ({
		agentId: profile?.user?.id,
	}));

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_onboarding_requests',
		method : 'get',
	}, { manual: true });

	const onboardingRequest = useCallback(() => {
		try {
			trigger({
				params: getParams({ agentId }),
			});
		} catch (error) {
			console.error('error:', error);
		}
	}, [trigger, agentId]);

	useEffect(() => {
		onboardingRequest();
	}, [onboardingRequest]);

	return {
		loading,
		data,
		onboardingRequest,
	};
};

export default useListOmnichannelOnboardingRequests;
