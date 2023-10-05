import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import {
	getCustomRecurrence, getDailyRecurrence, getMonthlyRecurrence,
	getWeeklyRecurrence,
	getYearlyRecurrence,
} from '../helpers/formatFreqCalendarPayload';
import combineDateAndTime from '../utils/combineDateAndTime';
import getMonthStartAndEnd from '../utils/getMonthStartAndEnd';

const RECURRENCE_RULE_MAPPING = {
	daily   : getDailyRecurrence,
	weekly  : getWeeklyRecurrence,
	monthly : getMonthlyRecurrence,
	yearly  : getYearlyRecurrence,
	custom  : getCustomRecurrence,
};

const getPayload = ({ eventDetails = {}, values = {}, eventData = {}, id = '', updatedId = {} }) => {
	const { category = '', event_type = '' } = eventDetails || {};
	const {
		end_date = '', end_time = '', mark_important_event = false, organization_id = '',
		organization_user_id = '', remarks = '', start_date = '', start_time = '',
		participants_users, occurence_event = '',
		title,
	} = values || {};

	const {
		start_date: startDate = '', end_date: endDate = '',
		weekly_repeat_on = [],
		month_on_date = 0, yearly_month = 0,
		yearly_on_date,
		custom_on_date = 0,
	} = eventData || {};

	const { addedIds = [], removedIds = [] } = updatedId || {};

	const recurrenceRule = RECURRENCE_RULE_MAPPING[occurence_event]?.({
		weekly_repeat_on,
		month_on_date,
		yearly_month,
		yearly_on_date,
		custom_on_date,
	}) || null;

	const isMeetingOneTime = category === 'meeting' && occurence_event !== 'one_time';

	return {
		calendar_id    : id || undefined,
		validity_start : combineDateAndTime({
			date : isMeetingOneTime ? startDate : start_date,
			time : start_time,
		}),
		start_time   : combineDateAndTime({ time: start_time, date: start_date }),
		end_time     : combineDateAndTime({ time: end_time, date: end_date }),
		category     : category === 'event' ? 'reminder' : category,
		is_important : mark_important_event,
		validity_end : combineDateAndTime({
			date : isMeetingOneTime ? endDate : end_date,
			time : end_time,
		}),
		description     : remarks,
		subject         : category === 'event' ? event_type : title,
		frequency       : category === 'event' ? 'one_time' : occurence_event,
		recurrence_rule : category === 'event' ? { type: 'normal' } : recurrenceRule,
		participants    : category === 'meeting' ? { user_ids: participants_users } : undefined,
		metadata        : category === 'event' ? {
			organization_id,
			user_id: organization_user_id,
		} : undefined,
		added_user_ids   : addedIds || undefined,
		removed_user_ids : removedIds || undefined,
	};
};

const useCreateCogooneCalendar = ({
	setEventDetails = () => {}, eventDetails = {},
	reset = () => {},
	getEvents = () => {},
	month = '',
	id = '',
	updatedId = {},
	setMonth = () => {},
	setAddEvents = () => {},
	setMyEvents = () => {},
}) => {
	const getUrl = id ? '/update_cogoone_calendar' : '/create_cogoone_calendar';

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : getUrl,
	}, { manual: true });

	const createEvent = async ({ values = {}, eventData = {} }) => {
		const { startDate, endDate } = getMonthStartAndEnd({ month });

		try {
			const payload = getPayload({ eventDetails, values, eventData, id, updatedId });
			await trigger({ data: payload });
			setEventDetails({
				category   : 'event',
				event_type : 'call_customer',
			});
			setMonth(new Date(values?.start_date || eventData?.start_date));
			setMyEvents({ start: (values?.start_date || eventData?.start_date) });
			setAddEvents(true);
			Toast.success(`${startCase(eventDetails?.category)} Scheduled Successfully`);
			reset();
			getEvents({ startDate, endDate });
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
