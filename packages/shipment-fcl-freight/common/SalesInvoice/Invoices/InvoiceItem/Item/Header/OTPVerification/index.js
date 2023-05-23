import { Modal, Button, RadioGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetOrgUsersData from '../../../../../../../hooks/useGetOrgUsersData';
import useSendInvoiceOtp from '../../../../../../../hooks/useSendInvoiceOtp';
import useVerifyInvoiceOtp from '../../../../../../../hooks/useVerifyInvoiceOtp';

import Loader from './Loader';
import OtpInput from './OtpInput';
import styles from './styles.module.css';

const OTP_LENGTH = 4;

function OTPVerification({
	showOtpModal = false,
	setShowOTPModal = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [otpValue, setOTPValue] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState('');

	const { loading, orgData } = useGetOrgUsersData({ invoice });

	const refetchAfterVerifydOtpApiCall = () => {
		setModalIsOpen(false);
		setShowOTPModal(false);
		refetch();
	};

	const { onClickSubmitOtp, verifyInvoiceLoader } = useVerifyInvoiceOtp({
		refetch: refetchAfterVerifydOtpApiCall,
	});

	const { sendOtpForInvoiceApproval } = useSendInvoiceOtp({
		refetch: () => setModalIsOpen(true),
	});

	const userList = orgData?.list?.filter((obj) => obj?.mobile_verified);

	const organizationOptions = userList?.map((obj) => ({
		label: (
			<div className={styles.container}>
				<div className={styles.user_name}>{obj?.name}</div>
				<span>
					(
					{obj?.mobile_country_code}
					-
					{obj?.mobile_number}
					)
				</span>
			</div>
		),
		value: `${obj.user_id}_${obj.name}`,
	}));

	const handleClick = async () => {
		if (!isEmpty(selectedUser)) {
			const payload = {
				invoice_id : invoice?.id,
				user_id    : selectedUser?.split('_')?.[0],
			};
			await sendOtpForInvoiceApproval(payload);
		}
	};
	const title = `Enter OTP sent to ${selectedUser?.split('_')?.[1]} registered mobile number`;

	let userListInfo = null;
	if (loading) {
		userListInfo = <Loader />;
	} else if (userList?.length === 0 && !loading) {
		userListInfo = <div className={styles.no_data}>No verified user exists!</div>;
	} else {
		(
			userListInfo =	(
				<RadioGroup
					options={organizationOptions}
					value={selectedUser}
					onChange={(item) => setSelectedUser(item)}
				/>
			)
		);
	}

	return (
		<div>
			{showOtpModal ? (
				<Modal
					show={showOtpModal}
					onClose={() => setShowOTPModal(false)}
				>
					<Modal.Header title="Select user to send OTP" />

					<Modal.Body className={styles.body}>
						{userListInfo}
					</Modal.Body>

					<Modal.Footer className={styles.modal_footer}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setShowOTPModal(false)}
						>
							Cancel
						</Button>

						<Button
							size="md"
							onClick={handleClick}
							disabled={userList?.length === 0 || isEmpty(selectedUser)}
						>
							Send
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}

			{modalIsOpen ? (
				<Modal
					show={showOtpModal}
					onClose={() => setModalIsOpen(false)}
					className={styles.otp_modal}
				>
					<Modal.Header title={title} />

					<Modal.Body>
						<div className={styles.Container}>
							<OtpInput
								otpLength={OTP_LENGTH}
								inputSize="lg"
								value={otpValue}
								onChange={(value) => {
									setOTPValue(value?.length === OTP_LENGTH ? `${value}` : '');
								}}
							/>
						</div>
					</Modal.Body>

					<Modal.Footer className={styles.modal_footer}>
						<Button
							size="md"
							disabled={verifyInvoiceLoader || isEmpty(otpValue)}
							onClick={() => onClickSubmitOtp({
								mobile_otp : otpValue,
								invoice_id : invoice?.id,
							})}
						>
							SUBMIT
						</Button>

						<Button
							size="md"
							onClick={() => sendOtpForInvoiceApproval()}
						>
							Resend OTP
						</Button>
					</Modal.Footer>
				</Modal>
			) : null}
		</div>
	);
}

export default OTPVerification;
