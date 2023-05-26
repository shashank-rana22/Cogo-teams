import TIMELINE_EDITABLE from '../config/timelineEditable.json';

export function canEditSchedule({ primary_service, activeStakeholder }) {
	const stateCheck = TIMELINE_EDITABLE.primary_service.state
		.includes(primary_service?.state);

	const keyPresenceCheck = TIMELINE_EDITABLE.primary_service.key_present_check
		.every((key) => !!primary_service?.[key]);

	const userNotAllowedCheck = !TIMELINE_EDITABLE.stakeholders_not_allowed.includes(activeStakeholder);

	return userNotAllowedCheck && (stateCheck || keyPresenceCheck);
}
