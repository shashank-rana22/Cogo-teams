import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({
	description = '', end_date = '', end_time = '', start_date = '',
	start_time = '', subject = '', lead_organization_id = '',
	lead_user_id = '', user_id = '', organization_id = '',
}) => ({
	subject,
	description,
	category : 'meeting',
	metadat  : {
		lead_user_id,
		user_id,
		lead_organization_id,
		organization_id,
	},
	frequency       : 'daily',
	tags            : ['demo_request'],
	recurrence_rule : {
		type         : 'normal',
		repeat_after : 1,
		unit         : 'day',
	},
	validity_start : start_date,
	start_time,
	validity_end   : end_date,
	end_time,

});

const useScheduleCalendar = ({ reset = () => {}, setScheduleDemo = () => {}, onboardingRequest = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_cogoone_calendar',
	}, { manual: true });

	const createMeeting = async ({
		val = {}, lead_organization_id = '',
		lead_user_id = '', user_id = '', organization_id = '',
	}) => {
		const {
			description = '', end_date = '', end_time = '', start_date = '',
			start_time = '', subject = '',
		} = val || {};
		try {
			await trigger({
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
	};
};

export default useScheduleCalendar;
