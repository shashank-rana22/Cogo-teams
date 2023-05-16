import { Modal, Button, Toast, RadioGroup } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import useGetOrgUsersData from '../../../../../../../hooks/useGetOrgUsersData';
import useSendInvoiceOtp from '../../../../../../../hooks/useSendInvoiceOtp';
import useVerifyInvoiceOtp from '../../../../../../../hooks/useVerifyInvoiceOtp';

import Loader from './Loader';
import OtpInput from './OtpInput';
import styles from './styles.module.css';

const OTP_LENGTH = 4;

function OTPVerificationModal({
	showOtpModal = false,
	setShowOTPModal = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [userList, setUserList] = useState([]);
	const [otpValue, setOTPValue] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState('');

	const { loading, orgData } = useGetOrgUsersData({ invoice });

	const handleOTPChange = (newOTP) => {
		setOTPValue(newOTP?.length === OTP_LENGTH ? `${newOTP}` : '');
	};

	const refetchAfterApiCall = () => {
		setModalIsOpen(true);
	};

	const { onClickSubmitOtp, verifyInvoiceLoader } = useVerifyInvoiceOtp(
		otpValue,
		setShowOTPModal,
		invoice,
		refetch,
	);
	const { sendOtpForInvoiceApproval } = useSendInvoiceOtp({
		invoice_id : invoice?.id,
		user_id    : selectedUser?.split('_')?.[0],
		refetch    : refetchAfterApiCall,
	});

	const userLists = orgData?.list?.filter((obj) => obj?.mobile_verified);

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

	useEffect(() => {
		setUserList(userLists);
	}, [userLists]);

	const handleClick = async () => {
		if (isEmpty(selectedUser)) Toast.error('Please select any user');
		else {
			// await sendOtpForInvoiceApproval();
			setModalIsOpen(true);
		}
	};
	const title = `Enter OTP sent to ${selectedUser?.split('_')?.[1]} registered mobile number`;

	if (userList?.length === 0) {
		return <div className={styles.no_data}>No verified user exists!</div>;
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
						{loading ? (
							<Loader />
						) : (
							<RadioGroup
								options={organizationOptions}
								value={selectedUser}
								onChange={(item) => setSelectedUser(item)}
							/>
						)}

					</Modal.Body>
					<Modal.Footer>
						<Button
							size="md"
							onClick={() => setShowOTPModal(false)}
						>
							Cancel
						</Button>

						<Button
							size="md"
							style={{ marginLeft: '16px' }}
							onClick={handleClick}
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
					<Modal.Footer>
						<Button
							size="md"
							disabled={verifyInvoiceLoader}
							onClick={() => onClickSubmitOtp()}
						>
							SUBMIT
						</Button>

						<Button
							size="md"
							style={{ marginLeft: '16px' }}
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

export default OTPVerificationModal;
