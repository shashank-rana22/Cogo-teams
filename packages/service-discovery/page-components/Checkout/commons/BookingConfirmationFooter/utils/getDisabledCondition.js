import { isEmpty } from '@cogoport/utils';

const getDisabledCondition = ({
	checkoutMethod,
	booking_status,
	manager_approval_proof,
	isControlBookingDetailsFilled,
	bookingConfirmationMode = '',
	detail = {},
}) => {
	const {
		booking_proof,
		importer_exporter_poc = {},
		importer_exporter_poc_id,
	} = detail;

	const { whatsapp_number_eformat = '', whatsapp_verified = '' } = importer_exporter_poc;

	if (checkoutMethod === 'controlled_checkout') {
		return (
			['pending_approval', 'rejected'].includes(booking_status)
			|| !manager_approval_proof
			|| !isControlBookingDetailsFilled
		);
	}

	if (bookingConfirmationMode === 'whatsapp') {
		return (
			!whatsapp_number_eformat
			|| !whatsapp_verified
			|| !importer_exporter_poc_id
		);
	}

	if (bookingConfirmationMode === 'booking_proof') {
		return isEmpty(booking_proof);
	}

	return false;
};

export default getDisabledCondition;
