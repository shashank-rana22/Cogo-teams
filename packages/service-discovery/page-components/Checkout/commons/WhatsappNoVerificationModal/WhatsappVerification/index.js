import { Button, cl } from '@cogoport/components';
import OTPInput from '@cogoport/forms/page-components/Business/OTPInput';

import getElementController from '../../forms/getElementController';

import styles from './styles.module.css';
import useWhatsappNoVerification from './useWhatsappNoVerification';

const OTP_LENGTH = 6;

function WhatsappVerification({
	selectedUser = {},
	type = '',
	handleWhatsappVerification = () => {},
	source = '',
	refetchUsers = () => {},
	source_id = '',
}) {
	const {
		control:controlItem = {},
		formProps = {},
		errors = {},
		onSubmit = () => {},
		showEnterOtpComponent = false,
		otpNumber = '',
		setOtpNumber = () => {},
		verifyWhatsappNumberLoading,
		sendVerificationOtpLoading,
		sendOtpNumber = () => {},
		verifyOtpNumber = () => {},
	} = useWhatsappNoVerification({
		selectedUser,
		type,
		handleWhatsappVerification,
		source,
		refetchUsers,
		source_id,
	});

	const { handleSubmit = () => {}, control } = formProps;

	const { name = '', label = '', type:elementType } = controlItem;

	const DynamicController = getElementController(elementType);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div key={name} className={cl`${styles.form_group} ${styles[name]}`}>
				<div className={styles.label}>
					{label}
				</div>

				<div className={cl`${styles.input_group} ${styles[name]}`}>
					<DynamicController
						{...controlItem}
						control={control}
						id={`${name}_input`}
					/>
				</div>

				{errors?.[name]?.message ? (
					<div className={styles.error_message}>
						{errors?.[name]?.message}
					</div>
				) : null}
			</div>

			{showEnterOtpComponent && (
				<div className={styles.otp_container}>
					<OTPInput
						otpLength={OTP_LENGTH}
						setOtpValue={setOtpNumber}
						loading={false}
						sendOtp={(obj) => sendOtpNumber({ ...obj })}
						verifyOtpNumber={verifyOtpNumber}
					/>
				</div>
			)}

			{!showEnterOtpComponent && (
				<Button
					className={styles.submit_button}
					type="submit"
					disabled={sendVerificationOtpLoading}
				>
					Get OTP
				</Button>
			)}

			{showEnterOtpComponent && (
				<Button
					className={styles.submit_button}
					onClick={verifyOtpNumber}
					disabled={verifyWhatsappNumberLoading || otpNumber?.length !== OTP_LENGTH}
				>
					Submit
				</Button>
			)}
		</form>
	);
}

export default WhatsappVerification;
