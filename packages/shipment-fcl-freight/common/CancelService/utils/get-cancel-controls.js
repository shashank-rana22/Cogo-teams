export default function getCancelExtraControls({
	selectedReason,
	cancelReasons,
	serviceProviderCancelled,
}) {
	const reasonObject = cancelReasons.find((reason) => reason.value === selectedReason);

	const { subreasons, free_text } = reasonObject || {};
	const extraControls = [];

	if (serviceProviderCancelled) {
		return [];
	}

	if (subreasons?.length > 0) {
		extraControls.push({
			name       : 'cancellation_subreason',
			label      : 'Select sub reason',
			selectType : 'pills',
			options    : subreasons,
			rules      : { required: 'Sub-reason is required' },
		});
	}

	if (free_text?.required) {
		extraControls.push({
			name  : 'cancellation_reason_comment',
			label : free_text?.label || 'How we can help you?',
			type  : free_text?.type || 'text',
			rules : free_text?.mandatory && { required: 'This is required field' },
		});
	}

	return extraControls;
}
