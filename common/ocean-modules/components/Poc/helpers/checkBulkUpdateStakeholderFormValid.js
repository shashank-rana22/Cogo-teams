export default function checkBulkUpdateStakeholderFormValid({
	formValues = {},
	FIELD_ARRAY_KEY = '',
	clearErrors = () => {},
	setError = () => {},
}) {
	const isAtLeastOneChecked = formValues?.[FIELD_ARRAY_KEY]
		.some((formValue) => !!formValue?.is_checked);

	if (isAtLeastOneChecked) {
		clearErrors(FIELD_ARRAY_KEY);
		return true;
	}

	formValues?.[FIELD_ARRAY_KEY].forEach((_, index) => {
		setError(`${FIELD_ARRAY_KEY}.${index}.is_checked`, {
			type    : 'custom',
			message : 'Please select at least one service',
		});
	});

	return 'Please select at least one service';
}
