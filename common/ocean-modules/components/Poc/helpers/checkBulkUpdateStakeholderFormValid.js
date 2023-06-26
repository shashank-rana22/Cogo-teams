export default function checkBulkUpdateStakeholderFormValid({
	formValues = {},
	fieldArrayKey = '',
	clearErrors = () => {},
	setError = () => {},
}) {
	const isAtLeastOneChecked = formValues?.[fieldArrayKey]
		.some((formValue) => !!formValue?.is_checked);

	if (isAtLeastOneChecked) {
		clearErrors(fieldArrayKey);
		return true;
	}

	formValues?.[fieldArrayKey].forEach((_, index) => {
		setError(`${fieldArrayKey}.${index}.is_checked`, {
			type    : 'custom',
			message : 'Please select at least one service',
		});
	});

	return 'Please select at least one service';
}
