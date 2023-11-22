import { Toggle, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState } from 'react';

import useCreateUserInactiveStatus from '../../../../../hooks/useCreateUserInactiveStatus';

import InactiveModal from './InactiveModal';
import styles from './styles.module.css';

function AgentStatus({
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	userId = '',
	firestore = {},
	isMobile = false,
}) {
	const { status = '' } = agentStatus || {};

	const [openInactiveModal, setOpenInactiveModal] = useState(false);

	const {
		loading: statusLoading = false,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce,
		setOpenModal: setOpenInactiveModal,
		agentTimeline,
		firestore,
	});

	const isAgentActive = status === 'active';

	const onChangeToggle = () => {
		if (isAgentActive) {
			setOpenInactiveModal(true);
		} else {
			updateUserStatus({ status: 'active', userId });
		}
	};

	const handlePunchIn = () => {
		const todayDateTime = formatDate({
			date       : new Date(),
			dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
			formatType : 'dateTime',
			separator  : ' ',
		});

		const data = {
			status         : 'punched_in',
			validity_start : todayDateTime,
			validity_end   : todayDateTime,
			userId,
		};

		updateUserStatus(data);
	};

	return (
		<div className={styles.container}>
			{status === 'punched_out'
				? (
					<Button
						className="primary"
						size="sm"
						onClick={handlePunchIn}
					>
						Start Shift
					</Button>
				) : (
					<Toggle
						name="online"
						size="md"
						showOnOff
						onChange={onChangeToggle}
						checked={status === 'active'}
						loading={statusLoading}
					/>
				)}

			{openInactiveModal && (
				<InactiveModal
					userId={userId}
					fetchworkPrefernce={fetchworkPrefernce}
					setOpenModal={setOpenInactiveModal}
					loading={statusLoading}
					updateUserStatus={updateUserStatus}
					isMobile={isMobile}
				/>
			)}
		</div>
	);
}
export default AgentStatus;
