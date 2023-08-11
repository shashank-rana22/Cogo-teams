import { Toggle } from '@cogoport/components';
import { useState } from 'react';

import useCreateUserInactiveStatus from '../../../../../hooks/useCreateUserInactiveStatus';

import LeaveModal from './LeaveModal';
import styles from './styles.module.css';

function LeaveStatus({
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
}) {
	const [openLeaveModal, setOpenLeaveModal] = useState(false);

	const {
		loading: statusLoading = false,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce,
		setOpenModal: setOpenLeaveModal,
		agentTimeline,
	});

	const { status = '' } = agentStatus || {};

	const isAgentOnLeave = status === 'on_leave';

	const onChangeToggle = () => {
		if (!isAgentOnLeave) {
			setOpenLeaveModal(true);
		} else {
			updateUserStatus({ status: 'active' });
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
					fetchworkPrefernce={fetchworkPrefernce}
					setOpenLeaveModal={setOpenLeaveModal}
					loading={statusLoading}
					updateUserStatus={updateUserStatus}
				/>
			)}
		</div>
	);
}

export default LeaveStatus;
