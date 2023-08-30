const checkClearanceDate = ({ value = '', bookingDate = '' }) => {
	if (value > bookingDate) {
		return 'Custom Clearance Date cannot be greater than booking date';
	}
	return true;
};
export default checkClearanceDate;
