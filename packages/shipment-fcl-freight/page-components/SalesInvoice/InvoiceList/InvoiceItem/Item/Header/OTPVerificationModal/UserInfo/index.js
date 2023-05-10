import { RadioGroup, Button, toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';
// import useSendInvoiceOtp from '../../../../../../../../hooks/useSendInvoiceOtp';

function UserInfo({
	list = [],
	setModalIsOpen = () => {},
	setOTPModal = () => {},
	invoice = {},
	setSelectedUser = () => {},
	selectedUser = {},
}) {
	// const { sendOtpForInvoiceApproval } = useSendInvoiceOtp({
	// 	invoice,
	// 	selectedUser,
	// 	setModalIsOpen,
	// });

	const organizationOptions = list?.map((obj) => ({
		label: (
			<div className={styles.Container}>
				<div className={styles.UserName}>{obj?.name}</div>
				(
				{obj?.mobile_country_code}
				-
				{obj?.mobile_number}
				)
			</div>
		),
		value: `${obj.user_id}_${obj.name}`,
	}));

	const handleClick = async () => {
		if (isEmpty(selectedUser)) toast.error('Please select any user');
		// else await sendOtpForInvoiceApproval();
	};

	if (list?.length === 0) {
		return <div className={styles.Nodata}>No verified user exists!</div>;
	}

	return (
		<div className={styles.UserInfoContainer}>
			<RadioGroup
				options={organizationOptions}
				value={selectedUser}
				onChange={(item) => setSelectedUser(item)}
			/>

			<div className={styles.Actions}>
				<Button
					className="secondary md"
					onClick={() => setOTPModal(false)}
					style={{ border: 'none' }}
				>
					Cancel
				</Button>

				<Button className="primary md" onClick={() => handleClick()}>
					Send
				</Button>
			</div>
		</div>
	);
}

export default UserInfo;
