import { Modal } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

// import useGetOrgUsersData from '../../../../../../../hooks/useGetOrgUsersData';
// import useSendInvoiceOtp from '../../../../../../../hooks/useSendInvoiceOtp';
// import useVerifyInvoiceOtp from '../../../../../../../hooks/useVerifyInvoiceOtp';

import Step1 from './Step1';
import Step2 from './Step2';

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

	// const { loading, orgData } = useGetOrgUsersData({ invoice });

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

	// const userLists = orgData?.list?.filter((obj) => obj?.mobile_verified);

	// useEffect(() => {
	// 	setUserList(userLists);
	// }, [JSON.stringify(orgData)]);

	return (
		<Modal
			show={showOtpModal}
			onClose={() => setOTPModal(false)}
			className="primary sm"
		>
			<Modal.Body>
				{modalIsOpen ? (
					<Step2
						selectedUser={selectedUser}
						setOTPValue={setOTPValue}
						otpValue={otpValue}
						// verifyInvoiceLoader={verifyInvoiceLoader}
						// sendOtpForInvoiceApproval={sendOtpForInvoiceApproval}
						// onClickSubmitOtp={onClickSubmitOtp}
					/>
				) : (
					<Step1
						// loading={loading}
						userList={userList}
						setModalIsOpen={setModalIsOpen}
						setOTPModal={setOTPModal}
						setSelectedUser={setSelectedUser}
						selectedUser={selectedUser}
						invoice={invoice}
					/>
				)}

			</Modal.Body>
		</Modal>
	);
}

export default OTPVerificationModal;
