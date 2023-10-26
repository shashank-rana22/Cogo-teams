import { useRequest } from '@cogoport/request';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback, useEffect } from 'react';

const DEFAULT_PAGE_LIMIT = 6;
const LIST_PAGE_LIMIT = 10;

const getParams = ({ agentId = '', showHistory = false }) => ({
	page_limit : !showHistory ? DEFAULT_PAGE_LIMIT : LIST_PAGE_LIMIT,
	filters    : {
		agent_id       : agentId,
		status         : !showHistory ? 'active' : undefined,
		request_status : !showHistory ? 'pending' : undefined,
	},
});

const useListOmnichannelOnboardingRequests = ({ showHistory = false }) => {
	const { agentId = '', requestApi = false } = useSelector(({ profile }) => ({
		agentId    : profile?.user?.id,
		requestApi : profile?.refetchRequestApi,
	}));

	const dispatch = useDispatch();

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_onboarding_requests',
		method : 'get',
	}, { manual: true });

	const onboardingRequest = useCallback(() => {
		try {
			trigger({
				params: getParams({ agentId, showHistory }),
			});
		} catch (error) {
			console.error('error:', error);
		} finally {
			dispatch(
				setProfileState({
					refetchDemoApi: false,
				}),
			);
		}
	}, [trigger, agentId, showHistory, dispatch]);

	useEffect(() => {
		onboardingRequest();
	}, [onboardingRequest, requestApi]);

	return {
		loading,
		data,
		onboardingRequest,
	};
};

export default useListOmnichannelOnboardingRequests;
