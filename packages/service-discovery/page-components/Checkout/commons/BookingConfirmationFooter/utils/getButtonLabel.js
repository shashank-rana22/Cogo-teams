const getButtonLabel = ({
	checkoutMethod,
	booking_status,
	bookingConfirmationMode,
}) => {
	if (
		checkoutMethod === 'controlled_checkout'
		&& booking_status === 'pending_approval'
	) {
		return 'Sent For Approval, Please wait...';
	}

	if (
		checkoutMethod === 'controlled_checkout'
		&& booking_status === 'rejected'
	) {
		return 'This Booking has been Rejected';
	}

	if (checkoutMethod === 'controlled_checkout') {
		return 'Send for Approval';
	}

	if (bookingConfirmationMode === 'mobile_otp') {
		return 'Send OTP For Approval';
	}

	if (bookingConfirmationMode === 'whatsapp') {
		return 'Get Confirmation on Whatsapp';
	}

	return 'Place Booking';
};

export default getButtonLabel;
