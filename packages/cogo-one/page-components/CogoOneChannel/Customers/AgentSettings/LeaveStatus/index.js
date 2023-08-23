import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import LeaveModal from '../../../../../common/LeaveModal';
import useCreateUserInactiveStatus from '../../../../../hooks/useCreateUserInactiveStatus';

import styles from './styles.module.css';

function LeaveStatus({
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	userId = '',
	firestore = {},
}) {
	const [openLeaveModal, setOpenLeaveModal] = useState(false);

	const {
		loading: statusLoading = false,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce,
		setOpenModal: setOpenLeaveModal,
		agentTimeline,
		firestore,
	});

	const { status = '' } = agentStatus || {};

	const isAgentOnLeave = status === 'on_leave';

	const onChangeToggle = () => {
		if (!isAgentOnLeave) {
			setOpenLeaveModal(true);
		} else {
			updateUserStatus({ status: 'active', userId });
		}
	};

	return (
		<div className={styles.container}>
			<Toggle
				name="online"
				size="md"
				showOnOff
				onChange={onChangeToggle}
				checked={!isAgentOnLeave}
				loading={statusLoading}
			/>

			{openLeaveModal && (
				<LeaveModal
					setOpenLeaveModal={setOpenLeaveModal}
					loading={statusLoading}
					updateUserStatus={updateUserStatus}
					userId={userId}
				/>
			)}
		</div>
	);
}

export default LeaveStatus;
