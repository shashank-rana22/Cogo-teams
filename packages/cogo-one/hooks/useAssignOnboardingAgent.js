import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

const getPayload = ({
	source = '',
	sourceId = '',
	agentId = '',
	requestType = '',
	requestedAt = '',
	previousAgents = '',
	metadata = {},
}) => ({
	source,
	source_id                : sourceId,
	agent_id                 : agentId,
	request_type             : requestType,
	requested_at             : requestedAt,
	previous_assigned_agents : [previousAgents],
	metadata,
});

const useAssignOnboardingAgent = ({ setAssignModal }) => {
	const dispatch = useDispatch();

	const [{ loading }, triggerParticipant] = useRequest({
		url    : '/assign_onboarding_agent',
		method : 'post',
	}, { manual: true });

	const onboardingAgent = async ({
		source = '',
		sourceId = '',
		agentId = '',
		requestType = '',
		requestedAt = '',
		previousAgents = '',
		metadata = {},
	}) => {
		try {
			await triggerParticipant({
				data: getPayload({
					source,
					sourceId,
					agentId,
					requestType,
					requestedAt,
					previousAgents,
					metadata,
				}),
			});
			Toast.success('Successfully Assigne !!');
			setAssignModal({
				show       : false,
				assignData : null,
			});

			dispatch(
				setProfileState({
					refetchRequestApi: true,
				}),
			);
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data) || 'something went wrong');
		}
	};

	return {
		onboardingAgent,
		loading,
	};
};

export default useAssignOnboardingAgent;
