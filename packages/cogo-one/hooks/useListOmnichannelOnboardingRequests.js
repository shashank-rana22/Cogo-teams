import { useRequest } from '@cogoport/request';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback, useEffect } from 'react';

const DEFAULT_PAGE_LIMIT = 6;
const LIST_PAGE_LIMIT = 10;

const getParams = ({
	agentId = '', showHistory = false, page = 1, initialViewType = '',
	assignTo = '', requestStatus = '', escalationCycle = '', requestType = '',
	end = null, requestCompleted = '', start = null,
}) => ({
	page_limit : !showHistory ? DEFAULT_PAGE_LIMIT : LIST_PAGE_LIMIT,
	filters    : {
		agent_id                : initialViewType !== 'cogoone_admin' ? agentId : assignTo || undefined,
		status                  : !showHistory ? 'active' : undefined,
		request_status          : !showHistory ? 'pending' : requestStatus || undefined,
		request_type            : requestType || undefined,
		escalation_cycle        : escalationCycle || undefined,
		request_completed_by    : requestCompleted || undefined,
		created_at_greater_than : start || undefined,
		created_at_less_than    : end || undefined,
	},
	page,

});

const useListOmnichannelOnboardingRequests = ({
	showHistory = false, initialViewType = '',
	filterValues = {}, setFilterValues = () => {},
}) => {
	const {
		requestType = '',
		assignTo = '',
		escalationCycle = '',
		requestStatus = '',
		start = null,
		end = null,
		requestCompleted = '',
	} = filterValues || {};

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
				params: getParams({
					agentId,
					showHistory,
					page,
					initialViewType,
					requestStatus,
					requestCompleted,
					requestType,
					assignTo,
					escalationCycle,
					start,
					end,
				}),
			});
			setFilterValues((prev) => ({ ...prev, show: false }));
		} catch (error) {
			console.error('error:', error);
		} finally {
			dispatch(
				setProfileState({
					refetchRequestApi: false,
				}),
			);
		}
	}, [trigger, agentId, showHistory, initialViewType, requestStatus, requestCompleted,
		requestType, assignTo, escalationCycle, start, end, dispatch, setFilterValues]);

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
