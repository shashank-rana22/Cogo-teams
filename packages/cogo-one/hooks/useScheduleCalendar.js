import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { getOnboardPayload, getPayload } from '../utils/platformAdoption';

const useScheduleCalendar = ({ reset = () => {}, setScheduleDemo = () => {}, onboardingRequest = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_cogoone_calendar',
	}, { manual: true });

	const [{ loading: onboardLoading }, onboardTrigger] = useRequest({
		method : 'post',
		url    : '/complete_onboarding_requests',
	}, { manual: true });

	const createMeeting = async ({
		val = {}, metadata = {}, requestId = '', requestStatus = '',
		requestType = '', source = '', sourceId = '',
	}) => {
		const {
			lead_organization_id = '', customer = {}, user_id = '', organization_id = '',
		} = metadata || {};
		const { lead_user_id = '' } = customer || {};
		const {
			description = '', end_date = '', end_time = '', start_date = '',
			start_time = '', subject = '',
		} = val || {};

		try {
			const res = await trigger({
				data: getPayload({
					description,
					start_date,
					start_time,
					subject,
					end_date,
					end_time,
					lead_organization_id,
					lead_user_id,
					user_id,
					organization_id,
				}),
			});

			if (res?.data?.id) {
				await onboardTrigger({
					data: getOnboardPayload({
						requestId, requestStatus, requestType, source, sourceId, metadata,
					}),
				});
			}

			reset();
			setScheduleDemo(() => ({ isScheduleDemo: false, scheduleData: {}, scheduleType: '' }));
			Toast.success('Scheduled Successfully');
			onboardingRequest({ page: 1 });
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		createMeeting,
		onboardLoading,
	};
};

export default useScheduleCalendar;
