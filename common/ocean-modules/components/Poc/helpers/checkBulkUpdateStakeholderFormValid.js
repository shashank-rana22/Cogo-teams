export default function checkBulkUpdateStakeholderFormValid({ formValues, FIELD_ARRAY_KEY }) {
	const isAtLeastOneChecked = formValues?.[FIELD_ARRAY_KEY].some((formValue) => !!formValue?.is_checked);

	return isAtLeastOneChecked ? true : 'Please select at least one service';
}
