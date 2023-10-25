import { createDraftRoom } from '../hooks/useCreateOrGetDraftTeamRoom';
import combineDateAndTime from '../utils/combineDateAndTime';

import {
	getCustomRecurrence, getDailyRecurrence, getMonthlyRecurrence,
	getWeeklyRecurrence,
	getYearlyRecurrence,
	getOneTimeRecurrence,
} from './formatFreqCalendarPayload';

const RECURRENCE_RULE_MAPPING = {
	one_time : getOneTimeRecurrence,
	daily    : getDailyRecurrence,
	weekly   : getWeeklyRecurrence,
	monthly  : getMonthlyRecurrence,
	yearly   : getYearlyRecurrence,
	custom   : getCustomRecurrence,
};

export const getPayload = async ({
	eventDetails = {}, values = {}, eventData = {}, updatedIds = {},
	updateEventDetails = {},
	hashFunction = () => {},
	loggedInAgendId = '',
	firestore = {},
}) => {
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

	const {
		id = '', validity_start = {}, validity_end = {}, recurrence_rule = {},
	} = updateEventDetails || {};

	const { days_of_week = [], date_of_month = 0, month_of_year = 0, repeat_after = 0 } = recurrence_rule || {};

	const { addedIds = [], removedIds = [] } = updatedIds || {};

	const recurrenceRule = RECURRENCE_RULE_MAPPING[occurence_event]?.({
		weekly_repeat_on,
		month_on_date,
		yearly_month,
		yearly_on_date,
		custom_on_date,
		days_of_week,
		date_of_month,
		month_of_year,
		repeat_after,
		id,
	}) || null;

	const isMeetingOneTime = category === 'meeting' && occurence_event !== 'one_time';

	let formatedParticipants = {};

	if (id) {
		formatedParticipants = {
			added   : addedIds ? { agent_ids: addedIds } : undefined,
			removed : removedIds ? { agent_ids: removedIds } : undefined,
		};
	} else {
		formatedParticipants = { agent_ids: participants_users };
	}

	let draftRoomId = '';
	if (category === 'meeting' && !id) {
		const hash = await hashFunction({ groupMemberIds: [...participants_users, loggedInAgendId] });
		const res = await createDraftRoom({
			userIds                : [...participants_users, loggedInAgendId],
			loggedInAgendId,
			firestore,
			length                 : 3,
			groupName              : title || 'Draft Meeting',
			category               : 'meeting',
			groupMembersHashString : hash,
			isGroup                : true,
		});
		draftRoomId = res?.id;
	}

	return {
		calendar_id    : id || undefined,
		validity_start : combineDateAndTime({
			date : isMeetingOneTime ? startDate || new Date(validity_start) : start_date,
			time : start_time,
		}),
		start_time   : combineDateAndTime({ time: start_time, date: start_date }),
		end_time     : combineDateAndTime({ time: end_time, date: end_date }),
		category     : category === 'event' ? 'reminder' : category,
		is_important : mark_important_event,
		validity_end : combineDateAndTime({
			date : isMeetingOneTime ? endDate || new Date(validity_end) : end_date,
			time : end_time,
		}),
		draft_room_id   : category === 'meeting' ? draftRoomId : undefined,
		description     : remarks,
		subject         : category === 'event' ? event_type : title,
		frequency       : category === 'event' ? 'one_time' : occurence_event,
		recurrence_rule : category === 'event' ? { type: 'normal' } : recurrenceRule,
		participants    : category === 'meeting' ? formatedParticipants : undefined,
		metadata        : category === 'event' ? {
			organization_id,
			user_id: organization_user_id,
		} : undefined,
	};
};
