import { Modal, Button, RadioGroup, Loader } from '@cogoport/components';
import FooterButtonWrapper from '@cogoport/surface-modules/common/FooterButtonWrapper';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetOrgUsersData from '../../../../../../../hooks/useGetOrgUsersData';
import useSendInvoiceOtp from '../../../../../../../hooks/useSendInvoiceOtp';
import useVerifyInvoiceOtp from '../../../../../../../hooks/useVerifyInvoiceOtp';

import OtpInput from './OtpInput';
import styles from './styles.module.css';

const USER_SPLIT_MOBILE_INDEX = 1;
const USER_SPLIT_ID_INDEX = 0;
const OTP_LENGTH = 4;

function OTPVerification({
	show = false,
	setShow = () => {},
	invoice = {},
	refetch = () => {},
}) {
	const [otpValue, setOTPValue] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState('');

	const { loading, orgData } = useGetOrgUsersData({ invoice });

	const refetchAfterVerifydOtpApiCall = () => {
		setModalIsOpen(false);
		setShow(false);
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
				user_id    : selectedUser?.split('_')?.[USER_SPLIT_ID_INDEX],
			};
			await sendOtpForInvoiceApproval(payload);
		}
	};
	const title = `Enter OTP sent to ${selectedUser?.split('_')?.[USER_SPLIT_MOBILE_INDEX]} registered mobile number`;

	let userListInfo = null;
	if (loading) {
		userListInfo = 		(
			<div className={styles.loader_wrapper}>
				<Loader />
			</div>
		);
	} else if (isEmpty(userList) && !loading) {
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
			{show ? (
				<Modal
					show={show}
					onClose={() => setShow(false)}
				>
					<Modal.Header title="Select User To Send OTP" />

					<Modal.Body className={styles.body}>
						{userListInfo}
					</Modal.Body>

					<Modal.Footer>
						<FooterButtonWrapper>
							<Button
								size="md"
								themeType="secondary"
								onClick={() => setShow(false)}
							>
								Cancel
							</Button>

							<Button
								size="md"
								onClick={handleClick}
								disabled={isEmpty(userList) || isEmpty(selectedUser)}
							>
								Send
							</Button>
						</FooterButtonWrapper>
					</Modal.Footer>
				</Modal>
			) : null}

			{modalIsOpen ? (
				<Modal
					show={show}
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
