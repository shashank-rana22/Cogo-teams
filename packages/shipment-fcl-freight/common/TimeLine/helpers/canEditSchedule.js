import TIMELINE_EDITABLE from '../config/timelineEditable.json';

export function canEditSchedule({ primary_service = {}, activeStakeholder = '' }) {
	const { state = '' } = primary_service || {};

	const stateCheck = TIMELINE_EDITABLE.primary_service.state
		.includes(state);

	const keysNotPresent = TIMELINE_EDITABLE.primary_service.key_present_check
		.every((key) => !primary_service?.[key]);

	const userNotAllowedCheck = !TIMELINE_EDITABLE.stakeholders_not_allowed.includes(activeStakeholder);

	const defaultEditable = userNotAllowedCheck && stateCheck;

	const editableBecauseKeyNotPresent = userNotAllowedCheck && keysNotPresent;

	return {
		isEditable: defaultEditable || editableBecauseKeyNotPresent,
		defaultEditable,
	};
}
