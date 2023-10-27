import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';

import useUpdateOnboardingRequest from './useUpdateOnboardingRequest';

const getPayload = ({ calendarId = '', isEmail = false, communicationId = '', agentId = '', scheduleId = '' }) => ({
	cogoone_calendar_id : calendarId,
	cogoone_schedule_id : scheduleId,
	agent_id            : agentId,
	status              : 'active',
	schedule_metadata   : {
		is_mail_sent     : !!isEmail,
		communication_id : isEmail ? communicationId : undefined,
	},
});

const useAssignMeetingAgent = ({ setScheduleDemo = () => {}, onboardingRequest = () => {} }) => {
	const dispatch = useDispatch();

	const [{ loading: modalLoading }, trigger] = useRequest({
		url    : '/assign_meeting_agent',
		method : 'post',
	}, { manual: true });

	const { requestLoader = false, updateRequest = () => {} } = useUpdateOnboardingRequest();

	const meetingAgent = async ({
		agentId = '', calendarId = '',
		isEmail = false, scheduleId = '', communicationId = '',
		requestId = '', requestStatus = '',
	}) => {
		try {
			const res = await trigger({
				data: getPayload({ agentId, calendarId, scheduleId, isEmail, communicationId }),
			});

			if (res?.data?.cogoone_calendar_id) {
				await updateRequest({ requestId, requestStatus });
			}

			Toast.success('Scheduled demo approved !!');
			setScheduleDemo(() => ({ isScheduleDemo: false, scheduleData: {}, scheduleType: '' }));
			onboardingRequest({ page: 1 });

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
		meetingAgent,
		updateLoader: modalLoading || requestLoader,
	};
};

export default useAssignMeetingAgent;
