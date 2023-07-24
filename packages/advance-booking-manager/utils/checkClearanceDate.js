const checkClearanceDate = ({ value, booking_date }) => {
	if (value > booking_date) {
		return 'Custom Clearance Date cannot be greater than booking date';
	}
	return true;
};
export default checkClearanceDate;
