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
	formProps = {},
	checkoutMethod = '',
	bookingConfirmationMode = '',
	checkout_type = '',
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
		services = {},
		primary_service = '',
		id: checkout_id = '',
	} = detail;

	const { getValues } = formProps;

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

	const [{ loading :updateLoading }, triggerUpdateCheckoutService] = useRequest(
		{
			method : 'post',
			url    : '/update_checkout_service',
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
		const {
			sailing_range = {},
			max_price, min_price,
			agreed_for_partial_shipment = false,
			...restValues
		} = getValues();

		const { startDate = '', endDate = '' } = sailing_range;

		const primaryServicesArray = Object.values(services).filter(
			(item) => item.service_type === primary_service,
		);

		if ((startDate && !endDate) || (!startDate && endDate)) {
			Toast.error('Select sailing range correctly');
			return;
		}

		if (Number(min_price) > Number(max_price)) {
			Toast.error('Min price cannot be greater than max price');
			return;
		}

		const payload = {
			id,
			update_rates                    : false,
			service                         : primary_service,
			fcl_freight_services_attributes : primaryServicesArray.map(
				({ id: service_id }) => ({
					id                   : service_id,
					shipping_preferences : {
						sailing_start_date          : startDate || undefined,
						sailing_end_date            : endDate || undefined,
						min_price                   : Number(min_price) || undefined,
						max_price                   : Number(max_price) || undefined,
						agreed_for_partial_shipment : agreed_for_partial_shipment === 'yes',
						...restValues,
					},
				}),
			),
		};

		const res = await triggerUpdateCheckoutService({ data: payload });

		if (!res || res?.hasError) {
			Toast.error('Something went wrong while saving shipping preferences');
			return;
		}

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
		submitButtonLoading: updateLoading || bookCheckoutLoading || loading || sendOtpLoading || whatsappLoading,
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
