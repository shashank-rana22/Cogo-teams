import { Toggle, Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useState } from 'react';

import useCreateUserInactiveStatus from '../../../../hooks/useCreateUserInactiveStatus';
import InactiveModal from '../InactiveModal';

function AgentStatus({
	agentStatus = {},
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
}) {
	const { status = '' } = agentStatus || {};

	const [openInactiveModal, setOpenInactiveModal] = useState(false);

	const {
		loading: statusLoading,
		updateUserStatus = () => {},
	} = useCreateUserInactiveStatus({
		fetchworkPrefernce,
		setOpenModal: setOpenInactiveModal,
		agentTimeline,
	});

	const isAgentActive = status === 'active';
	const onChangeToggle = () => {
		if (isAgentActive) {
			setOpenInactiveModal(true);
		} else {
			updateUserStatus({ status: 'active' });
		}
	};

	const handlePunchIn = () => {
		const data = {
			status         : 'punched_in',
			validity_start : formatDate({
				date       : new Date(),
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
			validity_end: formatDate({
				date       : new Date(),
				dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
				timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
				formatType : 'dateTime',
				separator  : ' ',
			}),
		};
		updateUserStatus(data);
	};

	return (
		<>
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
					fetchworkPrefernce={fetchworkPrefernce}
					setOpenModal={setOpenInactiveModal}
					loading={statusLoading}
					updateUserStatus={updateUserStatus}
				/>
			)}
		</>
	);
}
export default AgentStatus;
