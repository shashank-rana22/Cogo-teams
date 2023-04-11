import getCancelReasons from './get-cancel-reasons';

export default function getCancelExtraControls({
	selectedReason,
	isSeller,
}) {
	const type = isSeller ? 'service_supplier' : 'service_shipper';

	const cancelReasons = getCancelReasons(type);

	const reasonObject = cancelReasons.find((reason) => reason.value === selectedReason);

	const { subreasons, free_text } = reasonObject || {};

	const controls = [{
		name    : 'cancellation_reason',
		label   : 'Please select a reason for cancelling the shipment',
		type    : 'radio',
		options : cancelReasons,
		rules   : { required: 'cancellation reason is required' },
	}];

	if (subreasons?.length > 0) {
		controls.push({
			name    : 'cancellation_subreason',
			label   : 'Select sub reason',
			type    : 'chips',
			options : subreasons,
			rules   : { required: 'Sub-reason is required' },
		});
	}

	if (free_text?.required) {
		controls.push({
			name  : 'cancellation_reason_comment',
			label : free_text?.label || 'How we can help you?',
			type  : free_text?.type || 'text',
			size  : 'sm',
			rules : free_text?.mandatory && { required: 'This is required field' },
		});
	}

	return controls;
}
