import { Modal, Button } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

// import useGetOrgUsersData from '../../../../../../../hooks/useGetOrgUsersData';
// import useSendInvoiceOtp from '../../../../../../../hooks/useSendInvoiceOtp';
// import useVerifyInvoiceOtp from '../../../../../../../hooks/useVerifyInvoiceOtp';
// import Step1 from './Step1';
// import Step2 from './Step2';
import useGetOrgUsersData from '../../../../../../../hooks/useGetOrgUsersData';

import styles from './styles.module.css';
import UserInfo from './UserInfo';

const OTP_LENGTH = 4;

function OTPVerificationModal({
	showOtpModal = false,
	setOTPModal = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [userList, setUserList] = useState([]);
	const [otpValue, setOTPValue] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState({});

	const { loading, orgData } = useGetOrgUsersData({ invoice });

	// const { onClickSubmitOtp, verifyInvoiceLoader } = useVerifyInvoiceOtp(
	// 	otpValue,
	// 	setOTPModal,
	// 	invoice,
	// 	refetch,
	// );

	// const { sendOtpForInvoiceApproval } = useSendInvoiceOtp({
	// 	invoice,
	// 	selectedUser,
	// 	setModalIsOpen,
	// });

	const userLists = orgData?.list?.filter((obj) => obj?.mobile_verified);

	useEffect(() => {
		setUserList(userLists);
	}, [userLists]);

	// ${selectedUser?.split('_')?.[1]}
	return !showOtpModal ? (
		<Modal
			show={showOtpModal}
			onClose={() => setOTPModal(false)}
		>
			<Modal.Header title="Enter OTP sent to  registered mobile number" />
			<Modal.Body>
				<div className={styles.Container}>
					{/* <OtpInput
							otpLength={OTP_LENGTH}
							value={otpValue}
							onChange={(value) => {
								setOTPValue(value?.length === OTP_LENGTH ? `${value}` : '');
							}}
						/> */}
					OTP Input
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
				>
					SUBMIT
				</Button>

				<Button
					size="md"
					style={{ marginLeft: '16px' }}
				>
					Resend OTP
				</Button>

			</Modal.Footer>
		</Modal>
	) : (
		<Modal
			show={showOtpModal}
			onClose={() => setOTPModal(false)}
		>
			<Modal.Header title="Enter OTP sent to  registered mobile number" />
			<Modal.Body>
				<UserInfo
					list={userList}
					setModalIsOpen={setModalIsOpen}
					setOTPModal={setOTPModal}
					invoice={invoice}
					setSelectedUser={setSelectedUser}
					selectedUser={selectedUser}
				/>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="secondary md"
					onClick={() => setOTPModal(false)}
					style={{ border: 'none' }}
				>
					Cancel
				</Button>

				<Button
					className="primary md"
					style={{ marginLeft: '16px' }}
					onClick={() => setOTPModal(!showOtpModal)}
				>
					Send
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default OTPVerificationModal;
