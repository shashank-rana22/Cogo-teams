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
			<div className={styles.container}>
				<div className={styles.user_name}>{obj?.name}</div>
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
		return <div className={styles.no_data}>No verified user exists!</div>;
	}

	return (
		<div className={styles.user_info_container}>
			<RadioGroup
				className={styles.radio_group}
				options={organizationOptions}
				value={selectedUser}
				onChange={(item) => setSelectedUser(item)}
			/>
		</div>
	);
}

export default UserInfo;
