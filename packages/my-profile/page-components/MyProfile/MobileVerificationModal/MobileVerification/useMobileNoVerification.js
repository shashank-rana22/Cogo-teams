import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';

const getApiErrorString = (messages) => Object.keys(messages || {})
	.map((_) => `${startCase(_)} ${messages[_]}`)
	.join(', ');

const getControls = (t) => [
	{
		name        : 'mobileNumber',
		label       : t('profile:mobile_number_label'),
		type        : 'mobile-number-select',
		inputType   : 'number',
		placeholder : t('profile:mobile_number_placeholder'),
		span        : 12,
		rules       : { required: true },
	},
];

const useMobileNoVerification = ({ selectedUser = {}, type = '' }) => {
	const { t } = useTranslation(['profile']);

	const [showEnterOtpComponent, setShowEnterOtpComponent] = useState(false);
	const [otpNumber, setOtpNumber] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : '/verify_user_mobile',
		method : 'post',
	}, { manual: false });

	const controls = getControls(t);

	const newControls = useMemo(() => controls?.map((control) => {
		if (control?.name === 'mobileNumber' && type === 'verify') {
			return {
				...control,
				value: {
					country_code:
							selectedUser.mobile_country_code
							|| control?.value?.country_code
							|| '+91',
					number: selectedUser.mobile_number || control?.value?.number || '',
				},
			};
		}

		return { ...control };
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}), [controls, selectedUser]);

	const { handleSubmit, formState: { errors }, control: actualControl, getValues, setValue } = useForm();

	useEffect(() => {
		setValue(
			'mobileNumber',
			{
				number       : selectedUser?.mobile_number,
				country_code : selectedUser?.mobile_country_code,
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type]);

	const verifyMobileNumber = async ({ actionType = {}, ...restProps }) => {
		try {
			const values = getValues();

			let payload = {
				id                  : selectedUser.user_id,
				mobile_country_code : values?.mobileNumber?.country_code,
				mobile_number       : values?.mobileNumber?.number,
			};

			if (actionType === 'VERIFY_OTP') {
				payload = { ...payload, mobile_otp: otpNumber };
			}

			await trigger({ data: payload });

			if (actionType === 'SEND_OTP') {
				setShowEnterOtpComponent(true);

				Toast.success(t('profile:otp_resent_successfully'));

				restProps?.timer?.restart?.();
			}

			if (actionType === 'VERIFY_OTP') {
				Toast.success(t('profile:mobile_number_verified_successfully'));
				// eslint-disable-next-line no-undef
				window.location.reload();
			}
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data) || t('profile:otp_is_invalid'));
		}
	};

	const sendOtpNumber = ({ timer = {} }) => verifyMobileNumber({ actionType: 'SEND_OTP', timer });

	const verifyOtpNumber = () => verifyMobileNumber({ actionType: 'VERIFY_OTP' });

	const onSubmit = () => sendOtpNumber({});

	return {
		controls: newControls,
		onSubmit,
		showEnterOtpComponent,
		otpNumber,
		setOtpNumber,
		sendOtpNumber,
		verifyOtpNumber,
		actualControl,
		errors,
		handleSubmit,
		loading,
	};
};

export default useMobileNoVerification;
