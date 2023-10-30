const BOOKINGS_COUNT_ZERO = 0;
const accountStatusMapping = (item) => {
	let kyc_status = '';
	if (
		['pending_verification', 'rejected', 'pending_from_user'].includes(
			item?.kyc_status,
		)
	) {
		kyc_status = 'Sales Qualified';
	} else if (
		(item?.kyc_status === 'verified' && item?.bookings_count === BOOKINGS_COUNT_ZERO)
        || item?.bookings_count === null
	) {
		kyc_status = 'KYC Verified';
	} else if (item?.kyc_status === 'verified' && item?.bookings_count > BOOKINGS_COUNT_ZERO) {
		kyc_status = 'Transactional';
	}
	return kyc_status;
};
export default accountStatusMapping;
