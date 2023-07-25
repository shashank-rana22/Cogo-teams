import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import useBookShipment from '../../../../../../hooks/useBookShipment';
import useControlBookingApproval from '../../../../../../hooks/useControlBookingApproval';
import useUpdateCheckoutService from '../../../../../../hooks/useUpdateCheckoutService';

const useHandleBookingConfirmationFooter = ({
	detail = {},
	formProps = {},
	checkoutMethod = '',
	getCheckout = () => {},
	bookingConfirmationMode = '',
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

	const { controlBookingApproval, loading } = useControlBookingApproval({
		checkout_approvals,
		importer_exporter_id,
		importer_exporter,
	});

	const {
		deleteRateLoading: updateLoading,
		updateCheckoutService,
	} =	useUpdateCheckoutService({ refetch: getCheckout });

	const { bookShipment, loading: bookCheckoutLoading } = useBookShipment({
		checkout_id: id,
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
		const { sailing_range = {}, ...restValues } = getValues();

		const { startDate = '', endDate = '' } = sailing_range;

		const primaryServicesArray = Object.values(services).filter(
			(item) => item.service_type === primary_service,
		);

		if ((startDate && !endDate) || (!startDate && endDate)) {
			Toast.error('Select sailing range correctly');
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
						sailing_start_date : startDate,
						sailing_end_date   : endDate,
						...restValues,
					},
				}),
			),
		};

		await updateCheckoutService({ values: payload });

		if (bookingConfirmationMode === 'mobile_otp') {
			submitForOtpVerification();
			return;
		}

		if (checkoutMethod === 'controlled_checkout') {
			controlBookingApproval();
			return;
		}

		bookShipment();
	};

	const hasExpired = new Date().getTime() >= new Date(validity_end).getTime();

	return {
		handleSubmit,
		onClickSubmitOtp,
		submitButtonLoading: updateLoading || bookCheckoutLoading || loading || sendOtpLoading,
		verifyOtpLoading,
		checkout_approvals,
		hasExpired,
		showOtpModal,
		setOtpValue,
		setShowOtpModal,
		otpValue,
		submitForOtpVerification,
		validity_end,
	};
};

export default useHandleBookingConfirmationFooter;
