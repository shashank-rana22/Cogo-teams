import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { getPayload } from '../utils/platformAdoption';

import useUpdateOnboardingRequest from './useUpdateOnboardingRequest';

const useScheduleCalendar = ({ reset = () => {}, setScheduleDemo = () => {}, onboardingRequest = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_cogoone_calendar',
	}, { manual: true });

	const { requestLoader = false, updateRequest = () => {} } = useUpdateOnboardingRequest();

	const createMeeting = async ({ val = {}, metadata = {}, requestId = '', requestStatus = '' }) => {
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
				await updateRequest({ requestId, requestStatus });
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
		loading: loading || requestLoader,
		createMeeting,
	};
};

export default useScheduleCalendar;
