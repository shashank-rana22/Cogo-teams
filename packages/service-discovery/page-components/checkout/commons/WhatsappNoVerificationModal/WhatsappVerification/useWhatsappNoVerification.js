import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useMemo, useState } from 'react';

const control = 	{
	name        : 'whatsappNumber',
	label       : 'Whatsapp Number',
	type        : 'mobile-number-select',
	inputType   : 'number',
	placeholder : 'Whatsapp Number*',
	span        : 12,
	rules       : { required: true },
};

const useWhatsappNoVerification = ({
	selectedUser = {},
	type = '',
	handleWhatsappVerification,
	source,
	refetchUsers,
	source_id,
}) => {
	const [showEnterOtpComponent, setShowEnterOtpComponent] = useState(false);
	const [otpNumber, setOtpNumber] = useState('');
	const [count, setCount] = useState(1);

	const [{ verifyWhatsappNumberLoading }, verifyWhatsappNumberTrigger] = useRequest({
		method : 'post',
		url    : '/verify_otp',
	}, { manual: true });

	const [{ sendVerificationOtpLoading }, sendVerificationOtpTrigger] = useRequest({
		method : 'post',
		url    : '/send_verification_otp',
	}, { manual: true });

	const newControls = useMemo(() => {
		if (type === 'verify') {
			return {
				...control,
				value: {
					country_code:
							selectedUser?.whatsapp_country_code
							|| control?.value?.country_code
							|| '+91',
					number:
							selectedUser?.whatsapp_number || control?.value?.number || '',
				},
			};
		}

		return { ...control };
	}, [selectedUser?.whatsapp_country_code, selectedUser?.whatsapp_number, type]);

	const formProps = useForm();

	const watchWhatsappNumberControl = formProps.watch('whatsappNumber');

	useEffect(() => {
		if (showEnterOtpComponent) setShowEnterOtpComponent(false);
	}, [showEnterOtpComponent, watchWhatsappNumberControl]);

	useEffect(() => {
		formProps.setValue('whatsappNumber', {
			number       : selectedUser?.whatsapp_number,
			country_code : selectedUser?.whatsapp_country_code,
		});
	}, [formProps, selectedUser?.whatsapp_country_code, selectedUser?.whatsapp_number]);

	const verifyWhatsappNumber = async ({ actionType = {}, ...restProps }) => {
		try {
			const values = formProps.getValues();

			let payload = {
				source,
				source_id,
				channel             : 'whatsapp',
				mobile_number       : values?.whatsappNumber?.number,
				mobile_country_code : values?.whatsappNumber?.country_code,
				user_id:
					source === 'checkout' ? selectedUser?.id : selectedUser?.user_id,
			};

			if (actionType === 'VERIFY_OTP') {
				payload = { ...payload, otp: otpNumber };
				await verifyWhatsappNumberTrigger({ data: payload });
			}

			if (actionType === 'SEND_OTP') {
				payload = { ...payload, to_be_verified: true };
				await sendVerificationOtpTrigger({ data: payload });
				setShowEnterOtpComponent(true);
				Toast.success(`OTP ${count !== 1 ? 're' : ''}sent successfully`);
				restProps?.timer?.restart?.();
				setCount((prev) => prev + 1);
			}

			if (actionType === 'VERIFY_OTP') {
				Toast.success('Whatsapp number verified successfully');
				if (source === 'checkout') {
					handleWhatsappVerification();
				} else {
					refetchUsers();
				}
			}
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	const sendOtpNumber = ({ timer = {} }) => verifyWhatsappNumber({ actionType: 'SEND_OTP', timer });

	const onSubmit = () => sendOtpNumber({});

	const verifyOtpNumber = () => verifyWhatsappNumber({ actionType: 'VERIFY_OTP' });

	return {
		control : newControls,
		formProps,
		errors  : formProps.formState?.errors,
		onSubmit,
		showEnterOtpComponent,
		otpNumber,
		setOtpNumber,
		verifyWhatsappNumberLoading,
		sendVerificationOtpLoading,
		sendOtpNumber,
		verifyOtpNumber,
	};
};

export default useWhatsappNoVerification;
