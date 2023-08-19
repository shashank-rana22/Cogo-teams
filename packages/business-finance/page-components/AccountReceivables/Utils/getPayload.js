import { get, isEmpty } from '@cogoport/utils';

const CONTROLS_FORM_TYPE_MAPPING = {
	reminder: [
		'communication_type',
		'agent_id',
		'title',
		'reminder_date',
		'user_id',
		'additional_user_ids',
		'communication_summary',
	],
	activityLog: [
		'is_reminder',
		'communication_type',
		'agent_id',
		'title',
		'communication_response',
		'reminder_date',
		'communication_start_time',
		'communication_end_time',
		'user_id',
		'additional_user_ids',
		'add_to_teams',
		'communication_summary',
	],
};

const IS_REMINDER_CHECKED_CONTROL_NAMES = {
	true: [
		'is_reminder',
		'communication_type',
		'agent_id',
		'title',
		'reminder_date',
		'user_id',
		'additional_user_ids',
		'communication_summary',
	],
	false: [
		'is_reminder',
		'communication_type',
		'agent_id',
		'title',
		'communication_response',
		'communication_start_time',
		'communication_end_time',
		'user_id',
		'additional_user_ids',
		'add_to_teams',
		'communication_summary',
	],
};

const getFilteredValues = ({ values, formType, watchIsReminder }) => {
	const controlNamesByFormType = CONTROLS_FORM_TYPE_MAPPING[formType];

	const FILTEREDVALUEHASH = {};
	controlNamesByFormType.forEach((controlName) => {
		if (formType === 'activityLog') {
			const isControlNamesPresent = IS_REMINDER_CHECKED_CONTROL_NAMES[`${watchIsReminder}`].includes(
				controlName,
			);

			if (!isControlNamesPresent) {
				return;
			}
		}

		const value = values[controlName];
		if (!isEmpty(value) || typeof value === 'boolean') {
			FILTEREDVALUEHASH[controlName] = value;
		}
	});

	return FILTEREDVALUEHASH;
};

const getPayload = ({
	values,
	reminderDateFromCreditController = null,
	formType,
	voice_call,
	showMeetingInviteField,
	organizationId,
	partnerId,
}) => {
	const filteredValues = getFilteredValues(values);

	const isReminder = formType === 'reminder'
        || get(filteredValues, 'is_reminder')
        || !!reminderDateFromCreditController
        || false;

	let payload = {
		...filteredValues,
		is_reminder: isReminder,
	};

	if (formType === 'activityLog') {
		const userId = get(filteredValues, 'user_  id') || '';
		const additionalUserIds = get(filteredValues, 'additional_user_ids') || [];

		const filteredAdditionalUserIds = additionalUserIds.filter(
			(additionalUserId) => additionalUserId !== userId,
		);

		payload = {
			reminder_date: reminderDateFromCreditController || undefined,
			...payload,
			...(showMeetingInviteField && {
				add_to_teams: get(filteredValues, 'add_to_teams') || false,
			}),

			additional_user_ids: filteredAdditionalUserIds,

			communication_service_id: !isEmpty(voice_call?.call_id)
				? voice_call?.call_id
				: undefined,

			communication_service:
                payload?.communication_type === 'call'
                    && !isEmpty(voice_call?.call_id) ? 'servetel' : undefined,
		};
	}

	return {
		...payload,
		organization_id : organizationId,
		partner_id      : partnerId,
	};
};

export default getPayload;
