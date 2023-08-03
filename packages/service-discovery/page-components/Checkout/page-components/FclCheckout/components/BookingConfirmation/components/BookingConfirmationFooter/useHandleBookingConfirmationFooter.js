import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useBookShipment from '../../../../../../hooks/useBookShipment';
import useControlBookingApproval from '../../../../../../hooks/useControlBookingApproval';
import useSendWhatsappBooking from '../../../../../../hooks/useSendWhatsappBooking';

const useHandleBookingConfirmationFooter = ({
	detail = {},
	checkoutMethod = '',
	bookingConfirmationMode = '',
	checkout_type = '',
	setIsShipmentCreated = () => {},
}) => {
	const {
		partner_id,
		query: { shipment_id, rfq_id },
	} = useSelector(({ profile, general }) => ({
		partner_id : profile?.partner?.id,
		query      : general?.query,
	}));

	const {
		validity_end,
		checkout_approvals = [],
		importer_exporter_id,
		importer_exporter,
		id,
		id: checkout_id = '',
	} = detail;

	const [showOtpModal, setShowOtpModal] = useState(false);
	const [otpValue, setOtpValue] = useState('');

	const [{ loading: sendOtpLoading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/send_booking_confirmation_otp',
		},
		{ manual: true },
	);

	const [{ loading: verifyOtpLoading }, verifyOtpTrigger] = useRequest(
		{
			method : 'post',
			url    : '/verify_booking_confirmation_otp',
		},
		{ manual: true },
	);

	const { controlBookingApproval, loading } = useControlBookingApproval({
		checkout_approvals,
		importer_exporter_id,
		importer_exporter,
	});

	const { sendWhatsappBooking, whatsappLoading } = useSendWhatsappBooking();

	const { bookShipment, loading: bookCheckoutLoading } = useBookShipment({
		checkout_id: id,
		rfq_id,
		checkout_type,
		setIsShipmentCreated,
	});

	const submitForOtpVerification = async () => {
		try {
			await trigger({
				data: { checkout_id },
			});

			setShowOtpModal(true);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const onClickSubmitOtp = async () => {
		try {
			const payload = { checkout_id, mobile_otp: otpValue };

			const res = await verifyOtpTrigger({
				data: payload,
			});

			if (checkoutMethod === 'controlled_checkout') {
				controlBookingApproval();
			} else {
				setIsShipmentCreated(true);

				const newHref = `${window.location.origin}/${partner_id}/shipments/${
					shipment_id || res.data.shipment_id
				}`;

				window.location.href = newHref;
			}
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const handleSubmit = async () => {
		if (bookingConfirmationMode === 'mobile_otp') {
			submitForOtpVerification();
			return;
		}

		if (checkoutMethod === 'controlled_checkout') {
			controlBookingApproval();
			return;
		}
		const whatsappNumberEformat = detail?.importer_exporter_poc?.whatsapp_number_eformat;

		if (checkoutMethod === 'whatsapp') {
			sendWhatsappBooking(whatsappNumberEformat);
			return;
		}

		bookShipment();
	};

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	return {
		handleSubmit,
		onClickSubmitOtp,
		submitButtonLoading: bookCheckoutLoading || loading || sendOtpLoading || whatsappLoading,
		verifyOtpLoading,
		checkout_approvals,
		hasExpired,
		showOtpModal,
		setOtpValue,
		setShowOtpModal,
		otpValue,
		submitForOtpVerification,
		validity_end,
		whatsappLoading,
	};
};

export default useHandleBookingConfirmationFooter;
