import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const getPayload = ({ eventDetails = {}, values = {} }) => {
	const { category = '', event_type = '' } = eventDetails || {};
	const {
		end_date = '', end_time = '', mark_important_event = false, organization_id = '',
		organization_user_id = '', remarks = '', start_date = '', start_time = '',
	} = values || {};

	return {
		validity_start  : start_date,
		start_time,
		end_time,
		category        : category === 'event' ? 'reminder' : '',
		is_important    : mark_important_event,
		validity_end    : end_date,
		description     : remarks,
		subject         : event_type,
		frequency       : 'one_time',
		recurrence_rule : {
			type: 'normal',
		},
		invite_link     : 'hello',
		channel_chat_id : 'hello',
		platform        : 'app',
		metadata        : {
			organization_id,
			user_id: organization_user_id,
		},
	};
};

const useCreateCogooneCalendar = ({ setEventDetails = () => {}, eventDetails = {} }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_cogoone_calendar',
	}, { manual: true });

	const createEvent = async (values) => {
		try {
			const payload = getPayload({ eventDetails, values });
			await trigger({ data: payload });
			setEventDetails({
				category   : 'event',
				event_type : 'call_customer',
			});
			Toast.success('EventCreated Successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		loading,
		createEvent,
	};
};

export default useCreateCogooneCalendar;
