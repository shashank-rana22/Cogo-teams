import { useRequest } from '@cogoport/request';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback, useEffect } from 'react';

const DEFAULT_PAGE_LIMIT = 6;
const LIST_PAGE_LIMIT = 10;

const getParams = ({ agentId = '', showHistory = false, page = 1, initialViewType = '' }) => ({
	page_limit : !showHistory ? DEFAULT_PAGE_LIMIT : LIST_PAGE_LIMIT,
	filters    : {
		agent_id       : initialViewType !== 'cogoone_admin' ? agentId : undefined,
		status         : !showHistory ? 'active' : undefined,
		request_status : !showHistory ? 'pending' : undefined,
	},
	page,
});

const useListOmnichannelOnboardingRequests = ({ showHistory = false, initialViewType = '' }) => {
	const { agentId = '', requestApi = false } = useSelector(({ profile }) => ({
		agentId    : profile?.user?.id,
		requestApi : profile?.refetchRequestApi,
	}));

	const dispatch = useDispatch();

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_omnichannel_onboarding_requests',
		method : 'get',
	}, { manual: true });

	const onboardingRequest = useCallback(({ page = 1 }) => {
		try {
			trigger({
				params: getParams({ agentId, showHistory, page, initialViewType }),
			});
		} catch (error) {
			console.error('error:', error);
		} finally {
			dispatch(
				setProfileState({
					refetchRequestApi: false,
				}),
			);
		}
	}, [trigger, agentId, showHistory, dispatch, initialViewType]);

	useEffect(() => {
		onboardingRequest({ page: 1 });
	}, [onboardingRequest, requestApi]);

	return {
		loading,
		data,
		onboardingRequest,
	};
};

export default useListOmnichannelOnboardingRequests;
