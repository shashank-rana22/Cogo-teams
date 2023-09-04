import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getShipmentTypeFromUrl from '../../../../helpers/getShipmentTypeFromUrl';
import useBookShipment from '../../hooks/useBookShipment';
import useControlBookingApproval from '../../hooks/useControlBookingApproval';
import useSendWhatsappBooking from '../../hooks/useSendWhatsappBooking';

const URL_MAPPING = {
	fcl_freight : 'fcl',
	air_freight : 'air-freight',
};

const useHandleBookingConfirmationFooter = ({
	detail = {},
	checkoutMethod = '',
	bookingConfirmationMode = '',
	checkout_type = '',
	setIsShipmentCreated = () => {},
	setError = () => {},
	isAssistedBookingNotAllowed = false,
	invoicingParties = [],
	disableConditionForFcl = false,
	noRatesPresent = false,
}) => {
	const { push } = useRouter();

	const {
		partner_id,
		query: { shipment_id, rfq_id },
	} = useSelector(({ profile, general }) => ({
		partner_id : profile?.partner?.id,
		query      : general?.query,
	}));

	const shipmentType = getShipmentTypeFromUrl() || detail?.primary_service;

	const {
		validity_end,
		checkout_approvals = [],
		importer_exporter_id,
		importer_exporter,
		id: checkout_id = '',
		quotation_email_sent_at = '',
		booking_proof = '',
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
		checkout_id,
		rfq_id,
		checkout_type,
		setIsShipmentCreated,
		detail,
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

				if (URL_MAPPING[shipmentType]) {
					push(`booking/${URL_MAPPING[shipmentType]}/${
						shipment_id || res?.data?.shipment_id
					}`);
				} else {
					const newHref = `${window.location.origin}/
					${partner_id}/shipments/${shipment_id || res?.data?.shipment_id}`;

					window.location.href = newHref;
				}
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

		if (checkoutMethod === 'whatsapp' && whatsappNumberEformat) {
			sendWhatsappBooking(whatsappNumberEformat);
			return;
		}

		bookShipment();
	};

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	useEffect(() => {
		if (isAssistedBookingNotAllowed) {
			setError(`You are not allowed to book this shipment. 
			Kindly ask the customer to book from Partners Platform`);
			return;
		}

		if (noRatesPresent) {
			setError('Please remove services with no rates');
			return;
		}

		if (!quotation_email_sent_at) {
			setError('Please send quotation Email to continue');
			return;
		}

		if (isEmpty(invoicingParties)) {
			setError('There should be atleast 1 invoicing party');
			return;
		}

		if (disableConditionForFcl) {
			setError('Please select document preferences in Invoicing party that contains FCL freight');
			return;
		}

		if (bookingConfirmationMode === 'booking_proof' && isEmpty(booking_proof)) {
			setError('Please upload Booking Proof');
			return;
		}

		setError('');
	}, [
		bookingConfirmationMode,
		booking_proof,
		disableConditionForFcl,
		invoicingParties,
		isAssistedBookingNotAllowed,
		quotation_email_sent_at,
		setError,
		noRatesPresent,
	]);

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
