const formFieldsCheck = (formValues) => {
	if (
		'booking_reference_number' in formValues
		&& 'booking_reference_proof' in formValues
		&& formValues.booking_ref_status === 'placed'
	) {
		if (
			formValues.booking_reference_number
			|| formValues.booking_reference_proof
		) {
			return { value: false };
		}
		return { value: true, message: 'Please select atleast one field' };
	}
	return { value: true };
};
export default formFieldsCheck;
